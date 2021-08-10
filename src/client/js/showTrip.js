const showTrip = (data) => {
    const error = document.getElementById('formError');
    const results = document.getElementById('tripWeather');
    const tripInfo = document.getElementById('tripInfo');
    const tripImage = document.getElementById('tripImage');
    if (data.valid === true) {
        //tripInfo.style.backgroundImage = `url(${data.cityImageUrl || data.countryImageUrl})`;
        tripImage.style.backgroundImage = `url(${data.cityImageUrl || data.countryImageUrl})`;
        tripImage.innerHTML = `<h4>${data.city}, ${data.country}</h4>`
        error.innerHTML = '';
        results.innerHTML = `
            <div class="results-header">
                <h3>${data.city}, ${data.country}</h3>
                <img src="/img/icons/${data.currentWeather.weather.icon}.png" alt="weather-icon.jpg">
                <span>${data.currentWeather.weather.description}</span>
                <span>${data.currentWeather.temp}</span>
            </div>
        `;
    } else {
        error.innerHTML = '<span class="errorMsg">Couldn\'t find results for destination! Check your input!</span>';
        results.innerHTML = '';
    }

}

export {showTrip}