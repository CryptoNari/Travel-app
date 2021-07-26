const port = 8081;
// Setting up Express App-Instance
const express = require('express');
const app = express();
// Configure Express Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.listen(port, function() {
    console.log('::: server running :::');
    console.log(`::: running on localhost: ${port} :::`);
})