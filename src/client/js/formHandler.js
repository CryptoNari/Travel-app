import { showTrip } from "./showTrip";
import { dateCompare } from "./dateHandler";

let serverAddress = '';
if (process.env.NODE_ENV === "development") {
    serverAddress = 'http://localhost:3000/api-req';
} else if (process.env.NODE_ENV === "production") {
    serverAddress = 'https://travel-app-fend21.herokuapp.com/api-req';
}


// Event Handler for Form Submit Button
const startHandlers = () => {
    const addTripForm = document.querySelector('.trip-form');
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
    const formBtn = document.querySelector('button');

    const checkDateInputs = dateCompare(startDate,endDate);
    // verify date inputs
    if (checkDateInputs.valid === true) {
        formBtn.classList.toggle('loading'); 
        const userInput = {
            city: destination,
            dates: checkDateInputs
        }
        // Start Api Request on Server side
        //fetch('http://localhost:3000/api-req', {
        fetch(serverAddress, {
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
        formBtn.classList.toggle('loading');
        })
    } else {
        const error = document.getElementById('formError');
        error.innerHTML = checkDateInputs.error;
        formBtn.classList.toggle('loading');
    }
}

export { handleSubmit }
export { startHandlers }