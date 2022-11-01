const core = require('@actions/core');
const github = require('@actions/github');
const octokit = require('@octokit/rest');


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
var client = new octokit.Octokit({
    auth: token
});
client.git.createTag({
    ...github.context.repo,
    tag: version,
    message:version,
    object: github.context.payload.commits[0].id,
    type: 'commit'
})