// require https module
const https = require('https');
// require http module for status codes
const http = require('http');

// print error messages
function printError(error) {
    console.error(error.message);
}

//function to print message to console
function printMessage(username, badgeCount, points, subject) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in ${subject}`;
    console.log(message);
}

function get(username) {
    try {
        // connect to api url (https://teamtreehouse.com/ryanwhite89.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, (res)  => {
            if (res.statusCode === 200) {
                let body = "";
                // read the data
                res.on('data', data => {
                    body += data.toString();
                });
            
                res.on('end', () => {
                    try {
                        // parse the data
                        const profile = JSON.parse(body);
                        // print the data
                        let subject = profile.points[process.argv[2]] ? process.argv[2] : "JavaScript";
                        printMessage(username, profile.badges.length, profile.points[subject], subject);
    
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[res.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError)
            }
            
        });

        request.on('error', printError);
    } catch (error) {
        printError(error);
    }
}

module.exports.get = get;