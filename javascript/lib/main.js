const core = require('@actions/core');
const github = require('@actions/github');
const octokit = require('@octokit/rest');
const semver = require('semver');
var bumpVersion = require('semver-increment');

async function run(){
    const MAJOR = 0;                                 // don't bump MAJOR
    const MINOR = 0;                                 // bump MINOR
    const PATCH = 1;
    const mask = [MAJOR, MINOR, PATCH];
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    const repository = github.context.payload.repository;
    const prefix = core.getInput("prefix-tag");
    //console.log("Payload: " + payload);
    const defaultVersion = "1.0.0";
    //console.log("version: " + version);
    var token =  process.env.GITHUB_TOKEN;
    //console.log("token: " +token)
    const { GITHUB_REF, GITHUB_SHA } = process.env;
    //console.log("GITHUB_REF: " +GITHUB_REF)
    //console.log("GITHUB_SHA: " +GITHUB_SHA)
    //console.log(JSON.stringify(github.context.repo))
    var client = github.getOctokit(token);

   const {data} =  await client.rest.repos.listTags({
        ...github.context.repo
    })
    const tags = data.filter(x=> x.name.includes(prefix))
    if(tags.length === 0){
        const tag = `${prefix}-${defaultVersion}`;
        await CreateTag(github.context.repo,tag, github.context.sha)
        core.setOutput("new-tag",tag);
    }
    else{
        let latestTag = defaultVersion;
        let second = null;
        console.log("latest tag: " + latestTag);
        tags.map(x=>{
            console.log("tagname: " + x.name)
            const listVer = x.name.replace(`${prefix}-`,'');
            console.log("list-ver: " + listVer)
            console.log("latestTag-ver: " + latestTag)
            if(semver.gt(listVer,latestTag)){
                latestTag = semver.clean(listVer);
            }
        })
        console.log(latestTag); 
        const bumpedVersion = bumpVersion(mask,latestTag);

        const tag = `${prefix}-${bumpedVersion}`;
        await CreateTag(github.context.repo,tag, github.context.sha)
        core.setOutput("new-tag",bumpedVersion); 
    }
}
async function CreateTag(repo, version, sha){
    var token =  process.env.GITHUB_TOKEN;
    var client = github.getOctokit(token);
    const tag_resp = await client.rest.git.createTag({
        ...repo,
        tag: version,
        message:version,
        object: sha,
        type: 'commit'
    })
    const ref_rsp = await client.rest.git.createRef({
        ...repo,
        ref: `refs/tags/${version}`,
        sha: tag_resp.data.sha
    })
}
try {
    run()
} catch (error) {
    if (error instanceof Error) {
        core.setFailed(`CREATE_TAG_ERROR:${error.message}`)
    } else {
        core.setFailed(`CREATE_TAG_ERR:${error}`)
    }
}
