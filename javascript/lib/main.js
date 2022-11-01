const core = require('@actions/core');
const github = require('@actions/github');
const octokit = require('@octokit/rest');

async function run(){
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    const repository = github.context.payload.repository;
    console.log("Payload: " + payload);
    const version = "1.0.0";
    console.log("version: " + version);
    var token =  process.env.GITHUB_TOKEN;
    console.log("token: " +token)
    const { GITHUB_REF, GITHUB_SHA } = process.env;
    console.log("GITHUB_REF: " +GITHUB_REF)
    console.log("GITHUB_SHA: " +GITHUB_SHA)
    console.log(JSON.stringify(github.context.repo))
    var client = github.getOctokit(token);



    const tag_resp = await client.rest.git.createTag({
    ...github.context.repo,
    tag: version,
    message:version,
    object: github.context.sha,
    type: 'commit'
    })
    console.log(tag_resp);
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