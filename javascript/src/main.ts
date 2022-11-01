import * as core from '@actions/core';
import * as github from '@actions/github';
import { inc, parse, ReleaseType, valid, gte, SemVer } from "semver";
import { analyzeCommits } from "@semantic-release/commit-analyzer";
import { generateNotes } from "@semantic-release/release-notes-generator";
import {
    createTag,
    getBranchFromRef
} from "./utils";

async function run(){
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    const version = "1.0.0";
    let commitSha = core.getInput("commit_sha");
    const { GITHUB_REF, GITHUB_SHA } = process.env;

    var prefix = core.getInput( 'prefix-tag' );
    var token =  process.env.GITHUB_TOKEN;

    if (!GITHUB_REF) {
        core.setFailed("Missing GITHUB_REF.");
        return;
    }


    const currentBranch = getBranchFromRef(GITHUB_REF);
    await createTag("test-1.0.0", GITHUB_SHA!.toString());

    console.log("anything" ,GITHUB_REF,GITHUB_SHA)
    console.log(`The event payload: ${payload}`);


    core.setOutput( "new-tag", version );
}

run();