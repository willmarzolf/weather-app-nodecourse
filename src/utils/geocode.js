const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoid2lsbC1tYXJ6b2xmIiwiYSI6ImNrNGc3ZThldDB3YW4zb21naG8zbXVtYnAifQ.8XzZ7coQzE-CtFu09ihf9g&limit=1`;

    request({ url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to location service.', undefined) 
        } else if (body.features.length === 0) {
            callback('Location not found. Try another search.', undefined)
        } else {
            callback(undefined, {

                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    })
}

module.exports = geocode