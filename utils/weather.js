const request = require('request')

const getWeather = (lat, lng, callback) => {
    request(
        {
            url: `https://api.darksky.net/forecast/13a6ef252196bde026c124cbd34da861/${lat},${lng}`,
            json: true,
        },
        (error, response, body) => {
            if (!error && response.statusCode === 200)
                callback(undefined, body.currently.summary)
            else callback(`Unable to fetch weather.`)
        }
    )
}

module.exports = getWeather
