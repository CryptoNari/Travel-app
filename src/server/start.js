// Setting up Server
const app = require('./index')
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, listening);

function listening() {
    console.log('::: server running :::');
    console.log(`::: running on port: ${PORT} :::`)
}