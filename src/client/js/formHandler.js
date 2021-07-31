const handleSubmit = event => {
    event.preventDefault();
    
    // check what text was put into the form field
    let destination = document.getElementById('cityInput').value
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
    })
    
}

export { handleSubmit }