process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3001;
const StatusCode = require('./status-code.js');
const requestHelper = require('./request-helper.js');

const url = 'https://angular2-es6-weather-app.herokuapp.com/#/dashboard';
const qs = {};

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static('./client'));

var apiIntervalRef = null;
var inactiveTime = 0;
var firstInactivityOccurence = null;
var wasPreviouslyInactive = false;

function startWatching() {
  console.log(Object.keys(io.sockets.connected));
  if (!apiIntervalRef && Object.keys(io.sockets.connected).length) {
    console.log('startWatching');
    apiIntervalRef = setInterval(function () {
      requestHelper.getStatus(url, qs).then(sendStatus, sendStatus);
    }, 1000 * 5);
  }
}

function stopWatching() {
  console.log(Object.keys(io.sockets.connected));
  if (Object.keys(io.sockets.connected).length == 0) {
    console.log('stopWatching');
    clearInterval(apiIntervalRef);
    apiIntervalRef = false;
  }
}

function sendStatus(status) {
  console.log('status: ' + status);
  if (status == StatusCode.NOT_OK) {
    if (!wasPreviouslyInactive) {
      wasPreviouslyInactive = true;
      firstInactivityOccurence = new Date();
    }

    inactiveTime = (new Date()).getTime() - firstInactivityOccurence.getTime();
  } else {
    wasPreviouslyInactive = false;
    firstInactivityOccurence = null;
    inactiveTime = 0;
  }

  const message = {
    status: status,
    lastCheck: new Date().getTime(),
    inactiveTime: inactiveTime
  };

  io.sockets.emit('status changed', message);
}

io.on('connection', function (socket) {
  console.log('socket.io - connected - socketId: ' + socket.id);

  socket.on('client connected', function (msg) {
    console.log('client connected - socketId: ' + socket.id);
    // send a response when first connected
    requestHelper.getStatus(url, qs).then(sendStatus, sendStatus);
    startWatching();
  });

  socket.on('disconnect', function () {
    console.log('socket.io - disconnected - socketId: ' + socket.id);
    stopWatching();
  });
});


