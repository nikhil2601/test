/* eslint-disable no-console */

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const { getProcessEnv } = require('../config/utils');

// Build the express server.
const app = express();
// Extract some process variables.
const BUILD_DIR = getProcessEnv('BUILD_DIR') || 'build';
const NODE_ENV = getProcessEnv('NODE_ENV');
const PORT = getProcessEnv('PORT') || 5000;
// Use `bodyParser` to parse api inputs.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Sample API `GET` request on the same url/port that the app is runnin on.
// TODO: un-comment it out to test the api.
// app.get('/api/hello', (req, res) => {
//     res.send({ express: 'Hello from Express!' });
// });
// Sample API `POST` request on the same url/port that the app is running on.
// TODO: un-comment it out to test the api.
// app.post('/api/world', (req, res) => {
//     console.log('req :', req.body);
//     res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
// });
// If we're running in `production` we want to serve our static assets as well as,
// return any non-catched requests to our React Application.
if (NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '..', BUILD_DIR)));
    // Handle React routing, return all requets to the React App.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', BUILD_DIR, 'index.html'));
    });
}
// Listen on the required port, and start the server.
app.listen(PORT, () => console.log(`Server Started.\nListening on PORT ${PORT}.`));
