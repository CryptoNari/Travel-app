const showTrip = (data) => {
    const currentDate = new Date();
    const startDate = new Date(data.start);
    const endDate = new Date(data.end);
    // Check Dates
    console.log(startDate.getTime());
    console.log(endDate.getTime());
    const daysToTrip = (Math.ceil((startDate.getTime() -currentDate.getTime() ) / (24*60*60*1000)));
    const lengthOfTrip = (1 + Math.ceil((endDate.getTime() -startDate.getTime() ) / (24*60*60*1000)));
    const error = document.getElementById('formError');
    const destWeather = document.getElementById('destWeather');
    const destForecast = document.getElementById('destForecast');
    const tripInfo = document.getElementById('tripInfo');
    const tripImage = document.getElementById('tripImage');
    const tripCount = document.getElementById('tripCount');
    const tripLength = document.getElementById('tripLength');
    if (data.valid === true) {
        tripInfo.style.display = 'flex';
        tripImage.style.backgroundImage = `url(${data.cityImageUrl || data.countryImageUrl})`;
        tripImage.style.display = 'flex';
        tripImage.innerHTML = `
            <h4>${data.city}, ${data.country}</h4>
            <p>Current Weather:</p>
            `
        error.innerHTML = '';
        destWeather.innerHTML = `
            <div class="weather-report">
                <img src="/img/icons/${data.currentWeather[0].weather.icon}.png" alt="weather-icon.jpg">
                <p><br>${data.currentWeather[0].weather.description}</p>
                <p><br>${data.currentWeather[0].temp} °C</p>
            </div>
        `;
        destWeather.style.display = 'block';

        tripLength.innerHTML = lengthOfTrip;
        tripCount.innerHTML = daysToTrip;

        if (daysToTrip < 17){
            destForecast.innerHTML = `
                <div class="weather-report">
                    <img src="/img/icons/${data.forecastWeather[daysToTrip-1].weather.icon}.png" alt="weather-icon.jpg">
                    <p><br>${data.forecastWeather[daysToTrip-1].weather.description}</p>
                    <p><br>${data.forecastWeather[daysToTrip-1].temp} °C</p>
                </div>
            `;
        } else{
            destForecast.innerHTML = 'Forecast available only up to 16 Days';
            destForecast.style.textAlign = 'center';
        }    

    } else {
        error.innerHTML = '<span class="errorMsg">Couldn\'t find results for destination! Check your input!</span>';
        results.innerHTML = '';
    }

}

export {showTrip}