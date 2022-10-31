import * as core from '@actions/core';
import * as github from '@actions/github';


const payload = JSON.stringify(github.context.payload, undefined, 2);
const version = "1.0.0";


var prefix = core.getInput( 'prefix-tag' );
var token =  process.env.GITHUB_TOKEN;


console.log(`The event payload: ${payload}`);


core.setOutput( "new-tag", version );