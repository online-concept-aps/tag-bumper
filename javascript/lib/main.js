const core = require('@actions/core');
const github = require('@actions/github');
const octokit = require('@octokit/rest');

async function run(){
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    const repository = github.context.payload.repository;
    //console.log("Payload: " + payload);
    const version = "test-1.0.0";
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
    console.log(data);
    if(data){
        tags.data.map(x=> JSON.stringify(x))
    }
    //await CreateTag(github.context.repo,version, sha)




}
async function CreateTag(repo, version, sha){
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
