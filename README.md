# Capstone - Travel Planner App

Final Project on the "Udacity - Front End Web Developer nanodegree" course.

## Overview:

This project requires to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

### How to start

1. Clone this Repository
2. Node.js and npm needs to be installed 
3. Run `npm run start` in your terminal.
4. Open your browser and go to [http://localhost:3000/](http://localhost:3000/)

## Used APIs

### Geonames ([link](http://www.geonames.org/))

The GeoNames geographical database covers all countries and contains over eleven million placenames that are available for download free of charge.

### Weatherbit ([link](https://www.weatherbit.io/))

The High Performance Weather API for all of your Weather data needs.

### Pixabay ([link](https://pixabay.com/api/docs/))

API for searching and retrieving free images and videos released under the Pixabay License.

## Project Specifications

The Udacity project specifications to pass the course can be looked up in the [project rubric](https://review.udacity.com/#!/rubrics/2669/view).

### Extend Options

At least one of these is required, but the rest are great additional ways to further customize and improve your project!

- [x] Add end date and display length of trip.
- [x] Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- [ ] Allow user to add multiple destinations on the same trip.
    - [ ] Pull in weather for additional locations.
- [ ] Allow the user to add hotel and/or flight data.
    - [ ] Multiple places to stay? Multiple flights?
- [ ] Integrate the REST Countries API to pull in data for the country being visited.
- [ ] Allow the user to remove the trip.
- [ ] Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.
- [ ] Instead of just pulling a single day forecast, pull the forecast for multiple days.
- [x] Incorporate icons into forecast.
- [ ] Allow user to Print their trip and/or export to PDF.
- [ ] Allow the user to add a todo list and/or packing list for their trip.
- [ ] Allow the user to add additional trips (this may take some heavy reworking, but is worth the challenge).
    - [ ] Automatically sort additional trips by countdown.
    - [ ] Move expired trips to bottom/have their style change so it’s clear it’s expired.