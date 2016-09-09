# http-status-checker
## Http status checker

This is a small experimental project for monitoring the availability of a given url and shows you in a funny manner the status.

[Http status checker demo](https://http-status-checker.herokuapp.com)

## Configure
You need to have node.js installed on your machine.
Go to server/index.js and set your url and query strings (if any):
```javascript
const url = 'your_url_here';
const qs = {};
```
Then, go to the project root and ```npm install``` and finally: ```npm run start```

To see the result, open a browser and go to: ```localhost:3001```
