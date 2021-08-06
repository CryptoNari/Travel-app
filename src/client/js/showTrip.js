const showTrip = (data) => {
    const error = document.getElementById('formError');
    const results = document.getElementById('results');
    if (data.valid === true) {
        error.innerHTML = '';
        results.innerHTML = `
            <div class="results-header">
                <h3>${data.city}, ${data.country}</h3>
                <img src="/img/icons/${data.currentWeather.weather.icon}.png" alt="weather-icon.jpg">
                <span>${data.currentWeather.weather.description}</span>
                <span>${data.currentWeather.temp}</span>
            </div>
            <div class= "results-info">
                <img src="${data.cityImageUrl || data.countryImageUrl}" alt="weather-icon.jpg">    
            </div>
        `;
    } else {
        error.innerHTML = '<span class="errorMsg">Couldn\'t find results for destination! Check your input!</span>';
        results.innerHTML = '';
    }

}

export {showTrip}