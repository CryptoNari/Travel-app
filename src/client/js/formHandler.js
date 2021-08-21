import { showTrip } from "./showTrip";
import { dateCompare } from "./dateHandler";

// Event Handler for Form Submit Button
const startHandlers = () => {
    const addTripForm = document.getElementById('addTrip');
    addTripForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit();
    })
}

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
        fetch('http://localhost:3000/api-req', {
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

export { handleSubmit }
export { startHandlers }