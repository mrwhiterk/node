const https = require('https');
const api = require('./api.json');
const http = require('http');

// print temp details
function printWeather(weather) {
    const message = `The current temperature in ${weather.name} is ${weather.main.temp}F has wind speeds of ${weather.wind.speed}.`;
    console.log(message);
}
// print out error message
function printError(error) {
    console.error(error.message);
}

function get(location) {
    const readableQuery = location.join("+").replace(' ', '+');
    try {
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${api.key}`, (res) => {
            if (res.statusCode === 200) {
                let body = "";

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    try {
                        // Parse the data
                        const weather = JSON.parse(body);
                        // Check if the location was found before printing
                        if (weather.name) {
                            // Print the data
                            printWeather(weather);
                        } else {
                            const queryError = new Error(`The location "${readableQuery}" was not found`);
                            
                            printError(queryError);
                        }
                    } catch (err) {
                        // parse error
                        printError(err);
                    }
                });
            } else {
                // Status Code Error
                const statusCodeError = new Error(`There was an error getting the message for ${readableQuery}. (${http.STATUS_CODES[res.statusCode]})`);
                printError(statusCodeError);
            }
        });

        request.on('error', printError);
    } catch (error) {
        //malformed url error
        printError(error);
    }
}

module.exports.get = get;



