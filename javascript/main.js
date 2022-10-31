const core = require( '@actions/core' );

var username = core.getInput( 'username' );

console.log(`Hello ${username}`)