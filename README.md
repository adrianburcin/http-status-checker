[![Build Status](https://travis-ci.org/adrianburcin/http-status-checker.svg?branch=master)](https://travis-ci.org/adrianburcin/http-status-checker)

# Http status checker

This is a small experimental project for monitoring the availability of a given url and shows you in a funny manner the status.

[Http status checker demo](https://http-status-checker.herokuapp.com)

## What we use:

* [Socket.io](http://socket.io)
* [Node.js](https://nodejs.org/en/)
* [Moment.js](http://momentjs.com)

## Try

###### Configure
Go to server/index.js and set your url and query strings (if any):
```javascript
const url = 'your_url_here';
const qs = {};
```

###### Install
```
npm install
```

###### Run
```
npm run start
```
starts the server and client app and will serve the client on 3001
