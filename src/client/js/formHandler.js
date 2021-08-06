import { showTrip } from "./showTrip";

const startHandlers = () => {
    const addTripForm = document.getElementById('addTrip');
    addTripForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit();
    })
}

const handleSubmit = () => {
    
    // check what text was put into the form field
    const destination = document.getElementById('tripLocation').value;
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const currentDate = new Date();

        
    // Check Dates
    console.log(startDate.getTime());
    console.log(endDate.getTime());
    console.log(Math.ceil((endDate.getTime() -currentDate.getTime() ) / (24*60*60*1000)));

    // let destination = document.getElementById('tripLocation').value
    const userInput = {
       city: destination
    }

    console.log("::: Form Submitted :::");
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
    console.log(res)                                 //Client.uiUpdate(res)
    showTrip(res);
    })
    
}

export { handleSubmit }
export { startHandlers }