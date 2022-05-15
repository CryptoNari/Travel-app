var Client;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/client/js/dateHandler.js
/**
* @description Compares two dates and returns a object
* @param {string} start - Start Date
* @param {string} end - End Date
* @returns {object} result of date compare(valid,start,end,count,duration,error)
*/

const dateCompare = (start,end) => {
    let errormsg,accepted;
   
    // convert dates into a Date format to compare values
    const currentDate = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    // Get values for count (days until start) and duration (start to end)
    const count = (Math.ceil((startDate.getTime() -currentDate.getTime() ) / (24*60*60*1000)));
    const duration = (1 + Math.ceil((endDate.getTime() -startDate.getTime() ) / (24*60*60*1000)));

    // verify start input has not passed
    if (count < 0) {
        accepted = false;
        errormsg = 'Start Date already passed. Check your input!';
    } else {
        // verify start is earlier than end
        if (duration < 1) {
            accepted = false;
            errormsg = 'End Date before Start Date. Check your input!';
        } else {
            accepted = true;
            errormsg = '';
            }
    }
    
    return {
        valid: accepted,
        start: start,
        end: end,
        daysToTrip: count,
        lengthOfTrip: duration,
        error: errormsg 
    }
}


;// CONCATENATED MODULE: ./src/client/js/showTrip.js


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
                <img src="/img/icons/${data.currentWeather[0].weather.icon}.png" alt="weather-icon.png">
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
                    <img src="/img/icons/${data.forecastWeather[dateInfo.daysToTrip].weather.icon}.png" alt="weather-icon.png">
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


;// CONCATENATED MODULE: ./src/client/js/formHandler.js



// Event Handler for Form Submit Button
const startHandlers = () => {
    const addTripForm = document.getElementById('addTrip');
    addTripForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit();
    })
}

// On form submit start api request and show results
const handleSubmit = () => {  
    // get user inputs
    const destination = document.getElementById('tripLocation').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const checkDateInputs = dateCompare(startDate,endDate);

    // verify date inputs
    if (checkDateInputs.valid === true) {  
        const userInput = {
            city: destination,
            dates: checkDateInputs
        }
        // Start Api Request on Server side
        //fetch('http://localhost:3000/api-req', {
        fetch('https://travel-app-fend21.herokuapp.com/api-req', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInput),
        })
        .then(res => res.json())
        .then(res => {
        // Show/Load Api Response to User 
        showTrip(res);
        })
    } else {
        const error = document.getElementById('formError');
        error.innerHTML = checkDateInputs.error;
    }
}



;// CONCATENATED MODULE: ./src/client/img/icons/a01d.png
/* harmony default export */ const a01d = (__webpack_require__.p + "img/icons/a01d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a01n.png
/* harmony default export */ const a01n = (__webpack_require__.p + "img/icons/a01n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a02d.png
/* harmony default export */ const a02d = (__webpack_require__.p + "img/icons/a02d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a02n.png
/* harmony default export */ const a02n = (__webpack_require__.p + "img/icons/a02n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a03d.png
/* harmony default export */ const a03d = (__webpack_require__.p + "img/icons/a03d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a03n.png
/* harmony default export */ const a03n = (__webpack_require__.p + "img/icons/a03n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a04d.png
/* harmony default export */ const a04d = (__webpack_require__.p + "img/icons/a04d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a04n.png
/* harmony default export */ const a04n = (__webpack_require__.p + "img/icons/a04n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a05d.png
/* harmony default export */ const a05d = (__webpack_require__.p + "img/icons/a05d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a05n.png
/* harmony default export */ const a05n = (__webpack_require__.p + "img/icons/a05n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a06d.png
/* harmony default export */ const a06d = (__webpack_require__.p + "img/icons/a06d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/a06n.png
/* harmony default export */ const a06n = (__webpack_require__.p + "img/icons/a06n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/c01d.png
/* harmony default export */ const c01d = (__webpack_require__.p + "img/icons/c01d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/c01n.png
/* harmony default export */ const c01n = (__webpack_require__.p + "img/icons/c01n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/c02d.png
/* harmony default export */ const c02d = (__webpack_require__.p + "img/icons/c02d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/c02n.png
/* harmony default export */ const c02n = (__webpack_require__.p + "img/icons/c02n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/c03d.png
/* harmony default export */ const c03d = (__webpack_require__.p + "img/icons/c03d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/c03n.png
/* harmony default export */ const c03n = (__webpack_require__.p + "img/icons/c03n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/c04d.png
/* harmony default export */ const c04d = (__webpack_require__.p + "img/icons/c04d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/c04n.png
/* harmony default export */ const c04n = (__webpack_require__.p + "img/icons/c04n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/d01d.png
/* harmony default export */ const d01d = (__webpack_require__.p + "img/icons/d01d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/d01n.png
/* harmony default export */ const d01n = (__webpack_require__.p + "img/icons/d01n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/d02d.png
/* harmony default export */ const d02d = (__webpack_require__.p + "img/icons/d02d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/d02n.png
/* harmony default export */ const d02n = (__webpack_require__.p + "img/icons/d02n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/d03d.png
/* harmony default export */ const d03d = (__webpack_require__.p + "img/icons/d03d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/d03n.png
/* harmony default export */ const d03n = (__webpack_require__.p + "img/icons/d03n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/f01d.png
/* harmony default export */ const f01d = (__webpack_require__.p + "img/icons/f01d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/f01n.png
/* harmony default export */ const f01n = (__webpack_require__.p + "img/icons/f01n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r01n.png
/* harmony default export */ const r01n = (__webpack_require__.p + "img/icons/r01n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r02d.png
/* harmony default export */ const r02d = (__webpack_require__.p + "img/icons/r02d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r02n.png
/* harmony default export */ const r02n = (__webpack_require__.p + "img/icons/r02n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r03d.png
/* harmony default export */ const r03d = (__webpack_require__.p + "img/icons/r03d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r03n.png
/* harmony default export */ const r03n = (__webpack_require__.p + "img/icons/r03n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r04d.png
/* harmony default export */ const r04d = (__webpack_require__.p + "img/icons/r04d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r04n.png
/* harmony default export */ const r04n = (__webpack_require__.p + "img/icons/r04n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r05d.png
/* harmony default export */ const r05d = (__webpack_require__.p + "img/icons/r05d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r05n.png
/* harmony default export */ const r05n = (__webpack_require__.p + "img/icons/r05n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r06d.png
/* harmony default export */ const r06d = (__webpack_require__.p + "img/icons/r06d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/r06n.png
/* harmony default export */ const r06n = (__webpack_require__.p + "img/icons/r06n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s01d.png
/* harmony default export */ const s01d = (__webpack_require__.p + "img/icons/s01d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s01n.png
/* harmony default export */ const s01n = (__webpack_require__.p + "img/icons/s01n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s02d.png
/* harmony default export */ const s02d = (__webpack_require__.p + "img/icons/s02d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s02n.png
/* harmony default export */ const s02n = (__webpack_require__.p + "img/icons/s02n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s03d.png
/* harmony default export */ const s03d = (__webpack_require__.p + "img/icons/s03d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s03n.png
/* harmony default export */ const s03n = (__webpack_require__.p + "img/icons/s03n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s04d.png
/* harmony default export */ const s04d = (__webpack_require__.p + "img/icons/s04d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s04n.png
/* harmony default export */ const s04n = (__webpack_require__.p + "img/icons/s04n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s05d.png
/* harmony default export */ const s05d = (__webpack_require__.p + "img/icons/s05d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s05n.png
/* harmony default export */ const s05n = (__webpack_require__.p + "img/icons/s05n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s06d.png
/* harmony default export */ const s06d = (__webpack_require__.p + "img/icons/s06d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/s06n.png
/* harmony default export */ const s06n = (__webpack_require__.p + "img/icons/s06n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/t01d.png
/* harmony default export */ const t01d = (__webpack_require__.p + "img/icons/t01d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/t01n.png
/* harmony default export */ const t01n = (__webpack_require__.p + "img/icons/t01n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/t02d.png
/* harmony default export */ const t02d = (__webpack_require__.p + "img/icons/t02d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/t02n.png
/* harmony default export */ const t02n = (__webpack_require__.p + "img/icons/t02n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/t03d.png
/* harmony default export */ const t03d = (__webpack_require__.p + "img/icons/t03d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/t03n.png
/* harmony default export */ const t03n = (__webpack_require__.p + "img/icons/t03n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/t04d.png
/* harmony default export */ const t04d = (__webpack_require__.p + "img/icons/t04d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/t04n.png
/* harmony default export */ const t04n = (__webpack_require__.p + "img/icons/t04n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/t05d.png
/* harmony default export */ const t05d = (__webpack_require__.p + "img/icons/t05d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/t05n.png
/* harmony default export */ const t05n = (__webpack_require__.p + "img/icons/t05n.png");
;// CONCATENATED MODULE: ./src/client/img/icons/u00d.png
/* harmony default export */ const u00d = (__webpack_require__.p + "img/icons/u00d.png");
;// CONCATENATED MODULE: ./src/client/img/icons/u00n.png
/* harmony default export */ const u00n = (__webpack_require__.p + "img/icons/u00n.png");
;// CONCATENATED MODULE: ./src/client/img/travel_plan.jpg
/* harmony default export */ const travel_plan = (__webpack_require__.p + "img/icons/travel_plan.jpg");
;// CONCATENATED MODULE: ./src/client/js/iconImport.js


































































;// CONCATENATED MODULE: ./src/client/index.js










startHandlers();
Client = __webpack_exports__;
/******/ })()
;