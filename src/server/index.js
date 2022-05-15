// Setting up dotenv for api keys
const dotenv = require('dotenv');
dotenv.config();

// Setting up Express App-Instance
const express = require('express');
const app = express();
const path = require('path');

// Configure Express Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Helper for API-requests
//const FormData = require('form-data');
const fetch = require("node-fetch");
const { response } = require('express');

// get index.html
app.use(express.static('dist'));
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Jest Server Test
app.get('/test', async (req, res) => {
    res.json({message: 'pass!'})
})

//  Handle API Request with User Input
app.post('/api-req', async (req, res) => {
    // API-Data Collection
    let apiData = {}; 
    // API Keys with dotenv
    const geoUser = process.env.geonames_user;
    const weatherKey = process.env.weatherbit_APIKEY;
    const pixaKey = process.env.pixabay_APIKEY;
    // User API Request Input
    const destination = req.body.city;
    const startDate = req.body.dates.start;
    const endDate = req.body.dates.end;
    const daysToTrip = req.body.dates.daysToTrip;

    // First API request geonames
    let apiUrl = `http://api.geonames.org/searchJSON?username=${geoUser}&q=${destination}&maxRows=1`;
    console.log('::Request Geonames::');
    await fetch(apiUrl)
    .then(res => res.json())
    .then(res => {
        if (res.totalResultsCount > 0) {        // API Request result check
            apiData = {
                valid: true,
                city: res.geonames[0].toponymName,
                country: res.geonames[0].countryName,
                start: startDate,
                end: endDate,
                lat: res.geonames[0].lat,
                lng: res.geonames[0].lng
            };
            console.log('::: API Data: geonames :::');
            console.log(apiData);
        } else {        // API Request with no results
            apiData = {
                valid: false
            }    
        }
    })
    .catch(error => console.log('error',error));

    
    if (apiData.valid === true) {       // check for valid destination
        // Second API request weatherbit current
        apiUrl = `https://api.weatherbit.io/v2.0/current?key=${weatherKey}&lat=${apiData.lat}&lon=${apiData.lng}&lang=en`
        console.log('::Request Weatherbit::');
        await fetch(apiUrl)
        .then(res => res.json())
        .then(res => {
            apiData = {
                ...apiData,
                currentWeather: res.data
            };
            console.log('::: API Data: weatherbit :::');
            console.log(apiData);
        })
        .catch(error => console.log('error',error));

        // Further API request weatherbit forecast
        if (daysToTrip < 17) {
            apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${apiData.lat}&lon=${apiData.lng}&lang=en`
            console.log('::Request Weatherbit::');
            await fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                apiData = {
                    ...apiData,
                    forecastWeather: res.data
                };
                console.log('::: API Data: weatherbit :::');
                console.log(apiData);
            })
            .catch(error => console.log('error',error));
        } else {
            apiData = {
                ...apiData,
                forecastWeather: 'noData'
            };
        }

        // Third API request pixabay
        apiUrl = `https://pixabay.com/api/?key=${pixaKey}&q=${apiData.city}&category=places&per_page=4&orientation=horizontal`
        console.log('::Request Pixabay::');
        await fetch(apiUrl)
        .then(res => res.json())
        .then(res => {
            if (res.totalHits > 0) {
                apiData = {
                    ...apiData,
                    cityImageUrl: res.hits[0].webformatURL
                };
            } else {
                apiData = {
                    ...apiData,
                    cityImageUrl: ''
                };         
            }    
        })
        .catch(error => console.log('error',error));

        // image for the country when entered location has no results
        if (apiData.cityImageUrl === '') {
            apiUrl = `https://pixabay.com/api/?key=${pixaKey}&q=${apiData.country}&category=places&per_page=4`
            console.log('::Request Pixabay Country::');
            await fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                apiData = {
                    ...apiData,
                    countryImageUrl: res.hits[0].webformatURL
                };
            })
            .catch(error => console.log('error',error));
        }

    }
    console.log('::: API Data :::');
    console.log(apiData);
    res.send(apiData);
})

module.exports = app