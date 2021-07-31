const port = 3000;
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
const FormData = require('form-data');
const fetch = require("node-fetch");
const { response } = require('express');

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.listen(process.env.PORT || port, function() {
    console.log('::: server running :::');
    console.log(`::: running on localhost: ${port} :::`);
})

//  Handle API Request with User Input
app.post('/api-req', async (req, res) => {
    // API-Data Collection
    let apiData = {}; 
    // API Keys 
    const geoUser = process.env.geonames_user;
    const weatherKey = process.env.weatherbit_APIKEY;
    const pixaKey = process.env.pixabay_APIKEY;
    // User API Request 
    const destination = req.body.city;

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
        // Second API request weatherbit
        apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${apiData.lat}&lon=${apiData.lng}&lang=en`
        console.log('::Request Weatherbit::');
        await fetch(apiUrl)
        .then(res => res.json())
        .then(res => {
            apiData = {
                ...apiData,
                currentWeather: res.data[0]
            };
            console.log('::: API Data: weatherbit :::');
            console.log(apiData);
        })
        .catch(error => console.log('error',error));

        // Third API request pixabay
        apiUrl = `https://pixabay.com/api/?key=${pixaKey}&q=${apiData.city}&category=places&per_page=4`
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

/* app.get('/geonames', async function (req, res) {
    console.log('Start_API_Request');
    const api_url = 'http://api.geonames.org/searchJSON?'
    const city = 'Berlin'
    const response = await fetch(`${api_url}username=${process.env.geonames_user}&q=${city}&maxRows=1`)
    try{
        const data = await response.json();
        console.log('Received_API_Request');
        console.log(data);
        if (data.totalResultsCount > 0) {
            res.send (data);
        } else {
            res.send('no Data')
        }
        
    }catch(error){
        console.log("error", error);
    }
}) */

/* app.get('/weatherbit', async function (req, res) {
    console.log('Start_API_Request');
    const api_url = 'https://api.weatherbit.io/v2.0/forecast/daily?'
    const city = '2675078'
    const req_url =`${api_url}key=${process.env.weatherbit_APIKEY}&city_id=${city}&lang=en`
    console.log(req_url)
    const response = await fetch(req_url)
    try{
        const data = await response.json();
        console.log('Received_API_Request');
        console.log(data);
        res.send (data);
    }catch(error){
        console.log("error", error);
    }
}) */

/* app.get('/pixabay', async function (req, res) {
    console.log('Start_API_Request');
    const api_url = 'https://pixabay.com/api/?'
    const city = 'Sorsele'
    const req_url =`${api_url}key=${process.env.pixabay_APIKEY}&q=${city}&category=places&per_page=4`
    console.log(req_url)
    const response = await fetch(req_url)
    try{
        const data = await response.json();
        console.log('Received_API_Request');
        console.log(data);
        if (data.totalHits > 0) {
            res.send (data);
        } else {
            res.send('no picture')
        }    
    }catch(error){
        console.log("error", error);
    }
}) */