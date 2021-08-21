// Setting up Server
const app = require('./index')
const port = 3000;

const server = app.listen(port, listening);

function listening() {
    console.log('::: server running :::');
    console.log(`::: running on localhost: ${port} :::`)
}