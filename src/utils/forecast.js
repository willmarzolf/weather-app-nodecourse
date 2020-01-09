const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/8d50c4ec0f0e185a891f7c8de5a9578e/${latitude},${longitude}`
    
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Invalid search. Please try again.', undefined)
        } else {
            const data = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The High/Low Temperature for the day is: ${body.daily.data[0].temperatureMax} / ${body.daily.data[0].temperatureMin} degrees. The current Wind Speed is: ${body.currently.windSpeed} MPH. There is a ${body.currently.precipProbability}% chance of rain.`
            callback(undefined, data)
        }
    })
}

module.exports = forecast