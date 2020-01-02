const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Will Marzolf'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Will Marzolf'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Will Marzolf',
        message: 'Frequently asked questions:'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    const addressInput = req.query.address

    geocode(addressInput, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            } 

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: '404 error',
        errorMsg: 'Help resource not found.',
        name: 'Will Marzolf'
    })
})

app.get('*', (req, res) => {
    res.render('404error', {
        title: '404 error',
        errorMsg: 'Page not found.',
        name: 'Will Marzolf'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})