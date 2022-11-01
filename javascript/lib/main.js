const core = require('@actions/core');
const github = require('@actions/github');

const payload = JSON.stringify(github.context.payload, undefined, 2);
console.log("Payload: " + payload);
const version = "1.0.0";
console.log("version: " + version);
let commitSha = core.getInput("commit_sha");
console.log("commit sha: " +commitSha)
var token =  process.env.GITHUB_TOKEN;
console.log("token: " +token)
const { GITHUB_REF, GITHUB_SHA } = process.env;
console.log("GITHUB_REF: " +GITHUB_REF)
console.log("GITHUB_SHA: " +GITHUB_SHA)
