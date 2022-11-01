import * as core from '@actions/core';
import * as github from '@actions/github';


const payload = JSON.stringify(github.context.payload, undefined, 2);
const version = "1.0.0";
const commitSha = core.getInput("commit_sha");
const { GITHUB_REF, GITHUB_SHA } = process.env;

var prefix = core.getInput( 'prefix-tag' );
var token =  process.env.GITHUB_TOKEN;

console.log("anything" ,GITHUB_REF,GITHUB_SHA)
console.log(`The event payload: ${payload}`);


core.setOutput( "new-tag", version );