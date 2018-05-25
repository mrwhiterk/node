const https = require('https');
const api = require('./api.json');

// print temp details
function printWeather(weather) {
    const message = `The current temperature in ${weather.name} is ${weather.main.temp}F has wind speeds of ${weather.wind.speed}.`;
    console.log(message);
}
// print out error message

function get(location) {
    const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${api.key}`, (res) => {
        let body = "";

        res.on('data', (data) => {
            body += data.toString();
        });

        res.on('end', () => {
            try {
                const weather = JSON.parse(body);
                printWeather(weather);
            } catch (err) {
                console.log(1, err);
            }
        });
    });

    request.on('error', (err) => {
        console.log(2, err);
    });
}

module.exports.get = get;



