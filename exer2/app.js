var weather = require('./weather.js');

const query = process.argv.slice(2);

if (!query) {
    console.log("Add location then press \"Enter\"");
} else {
    weather.get(query);
}