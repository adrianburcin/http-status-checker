$(document).ready(function() {

  var socket = io();

  socket.on('status changed', function(response) {
    $('.hsm__control__status').empty().text(response.status);
    if(response.status === 'OK') {
      $('.hsm__control__status').removeClass('hsm__error--background-color');
      $('.hsm__control__inactive-time').removeClass('hsm__error--background-color');
    } else {
      $('.hsm__control__status').addClass('hsm__error--background-color');
      $('.hsm__control__inactive-time').addClass('hsm__error--background-color');
    }
    var image = response.status === 'OK' ? 'assets/running.gif' : 'assets/stopped.gif';
    $('.hsm__image-status--border').attr('src', image);

    var lastCheck = moment(response.lastCheck);
    $('.hsm__control__last-check').empty().text(lastCheck.format('MM/DD/YYYY hh:mm:ss'));

    var inactiveTime = moment.utc(response.inactiveTime);
    $('.hsm__control__inactive-time').empty().text(inactiveTime.format('HH:mm:ss'));
  });

  socket.emit('client connected', 'connected');
});