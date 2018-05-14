// problem: simple way to look up users badge count and javascript points
// solution: use node to connect to treehouse api
// require https module
const https = require('https');
const username = "ryanwhite89";

//function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}


// connect to api url (https://teamtreehouse.com/ryanwhite89.json)
const request = https.get(`https://teamtreehouse.com/${username}.json`, res => {
    let body = "";
    // read the data
    res.on('data', data => {
        body += data.toString();
    });

    res.on('end', () => {
        // parse the data
        console.log(body);
        console.log(typeof body);
        // print the data
    });

});

