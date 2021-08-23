import { dateCompare } from "./dateHandler";

/**
* @description Shows Data from API Requests to User
* @param {object} data - Api Response from Server
*/
const showTrip = (data) => {
    // Output Elements 
    const error = document.getElementById('formError');
    const destWeather = document.getElementById('destWeather');
    const destForecast = document.getElementById('destForecast');
    const tripInfo = document.getElementById('tripInfo');
    const tripImage = document.getElementById('tripImage');
    const tripCount = document.getElementById('tripCount');
    const tripLength = document.getElementById('tripLength');
    // Date Information to get right data
    const dateInfo = dateCompare(data.start,data.end);

    // Check valid user destination input
    if (data.valid === true) {
        // show result Elements
        tripInfo.style.display = 'flex'; 
        tripImage.style.display = 'flex';
        destWeather.style.display = 'block';
        // fill Information
        tripImage.style.backgroundImage = `url(${data.cityImageUrl || data.countryImageUrl})`;
        tripImage.innerHTML = `
            <h4>${data.city}, ${data.country}</h4>
            <p>Current Weather:</p>
            `;
        
        destWeather.innerHTML = `
            <div class="weather-report">
                <img src="/img/icons/${data.currentWeather[0].weather.icon}.png" alt="weather-icon.jpg">
                <div class="current-trip-weather">
                    <p>${data.currentWeather[0].weather.description}</p>
                    <p>${data.currentWeather[0].temp} °C</p>
                </div>    
            </div>
            `;
        tripLength.innerHTML = dateInfo.lengthOfTrip;
        tripCount.innerHTML = dateInfo.daysToTrip;
        // check if Forecast data is available
        if (dateInfo.daysToTrip < 16){
            destForecast.innerHTML = `
                <div class="weather-report">
                    <img src="/img/icons/${data.forecastWeather[dateInfo.daysToTrip].weather.icon}.png" alt="weather-icon.jpg">
                    <div>
                        <p>${data.forecastWeather[dateInfo.daysToTrip].weather.description}</p>
                        <p>${data.forecastWeather[dateInfo.daysToTrip].temp} °C</p>
                    </div>       
                </div>
                `;
        } else {
            destForecast.innerHTML = `Forecast available in ${dateInfo.daysToTrip-15} Day/s`;
            destForecast.style.textAlign = 'center';
        }    
        error.innerHTML = '';
    } else {
        error.innerHTML = '<span class="errorMsg">Couldn\'t find results for destination! Check your input!</span>';
        results.innerHTML = '';
    }

}

export {showTrip}