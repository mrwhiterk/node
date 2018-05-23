// problem: simple way to look up users badge count and javascript points
// solution: use node to connect to treehouse api

const profile = require('./profile');

const user = process.argv.slice(3);
user.forEach(profile.get);
