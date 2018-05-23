const https = require('https');
const fs = require('fs');
let myKey;

fs.readFile('./key.txt', 'utf8', (err, data) => {
    if (err) throw err;
    myKey = data;
    
    const query = process.argv[2];
    if (!query) {
        console.log("Add location then press \"Enter\"");
    } else {
        getWeather(query);
    }
});

function getWeather(location) {
    const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${myKey}`, (res) => {
        let body = "";

        res.on('data', (data) => {
            body += data.toString();
        });

        res.on('end', () => {
            try {
                const weather = JSON.parse(body);
                console.log(
                    `The current temperature in ${weather.name} is ${weather.main.temp} deg has wind speeds of ${weather.wind.speed}.`
                );
            } catch (err) {
                console.log(err);
            }
        });
    });
    
    request.on('error', (err) => {
        console.log(err);
    });
}



