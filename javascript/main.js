const core = require( '@actions/core' );
const github = require('@actions/github');
const payload = JSON.stringify(github.context.payload, undefined, 2);
const version = "1.0.0";
var prefix = core.getInput( 'prefix-tag' );
var token = core.getInput( 'github-token' );
console.log(`The event payload: ${payload}`);
console.log(`Hello ${prefix}`)
console.log(`::set-output name=myOutput::${prefix +"-"+ version}`)
