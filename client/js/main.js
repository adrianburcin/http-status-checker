$(document).ready(function() {

  var socket = io();

  socket.on('status changed', function(response) {
    $('.status').empty().text(response.status);

    var lastCheck = moment(response.lastCheck);
    $('.last-check').empty().text(lastCheck.format('MM/DD/YYYY hh:mm:ss'));

    var inactiveTime = moment.utc(response.inactiveTime);
    $('.inactive-time').empty().text(inactiveTime.format('HH:mm:ss'));
  });

  socket.emit('client connected', 'connected bla bla bla');
});