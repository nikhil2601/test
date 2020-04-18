// const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

const dir = process.env.BUILD_DIR || 'build';
const port = process.env.PORT || 8000;

// app.use(express.static(path.join(__dirname, '..', dir)));
//
// const server = http.createServer(app);
//
// server.on('listening', () => {
//   console.log('Server started http://localhost:%d/', server.address().port);
// });
//
// server.on('close', () => {
//   console.log('Server closed');
// });
//
// server.listen(port);

app.set('port', port);

app.use(express.static(path.join(__dirname, '..', dir)));
app.use('/static', express.static(path.join(__dirname, '..', dir, '/static')));

const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log('Server started http://localhost:%d/', port); // eslint-disable-line no-console
});
