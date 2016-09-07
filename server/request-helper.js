const request = require('request');
const StatusCode = require('./status-code.js');

module.exports = {
  getStatus: function(url, qs) {
  return new Promise(function (resolve, reject) {
    var options = {
      url: url,
      qs: qs
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(StatusCode.OK);
      } else {
        reject(StatusCode.NOT_OK);
      }
    }

    request(options, callback);
  });
}
};