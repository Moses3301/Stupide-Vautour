const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const APP_PATH = path.resolve(__dirname, '../', 'client/build');

app.use('/', express.static(APP_PATH));
app.get('/', (req, res) => res.sendFile(`${APP_PATH}/index.html`));
app.get('/hello', (req, res) => res.send(path.resolve(__dirname, '../', 'client/public/welcome.html')));

// error handlers
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '⛔' : error.stack
  })
});

//Start server
const port = process.env.PORT || 1337;

const server = app.listen(port , () => {
  console.log(`listening at port ${port}`);
});

//##################################################################################

const io = require('socket.io')(server);
const socketEvents = require('./socket')(io);
