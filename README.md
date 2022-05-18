# Travel Planner App
![Heroku](https://pyheroku-badge.herokuapp.com/?app=travel-app-fend21&style=plastic)

This was the Final Project of the "Udacity - Front End Web Developer nanodegree" course. You can have a look at this project [here](https://travel-app-fend21.herokuapp.com/).

<hr>

## Overview:

This project required to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

### How to start on your local machine

Note: To make successfull API calls you need to have valid API keys for ([Geonames](http://www.geonames.org/)), ([Weatherbit](https://www.weatherbit.io/)) and ([Pixabay](https://pixabay.com/api/docs/)).

1. Clone this Repository
2. Node.js and npm needs to be installed
3. Create a '.env' file in the app directory and paste in your keys:
    ```
        geonames_user = YOUR_KEY_HERE
        weatherbit_APIKEY = YOUR_KEY_HERE
        pixabay_APIKEY = YOUR_KEY_HERE

    ```
4. Run `npm run start` in your terminal.
5. Open your browser and go to [http://localhost:3000/](http://localhost:3000/)

<hr>

## Project Specifications

The Udacity project specifications to pass the course can be looked up in the [project rubric](https://review.udacity.com/#!/rubrics/2669/view).


## Used Tools

- [![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://github.com/NaNaFoNo)
- [![expressjs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://github.com/NaNaFoNo)
- Webpack
- Babel
- [![sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://github.com/NaNaFoNo)
- Jest
- Service Workers

## Used APIs

### ([Geonames](http://www.geonames.org/))

The GeoNames geographical database covers all countries and contains over eleven million placenames that are available for download free of charge.

### ([Weatherbit](https://www.weatherbit.io/))

The High Performance Weather API for all of your Weather data needs.

### ([Pixabay](https://pixabay.com/api/docs/))

API for searching and retrieving free images and videos released under the Pixabay License.
