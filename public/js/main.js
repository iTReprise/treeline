/* global $ */

$(() => {
  /* show loading icon */
  $('#summonerSearchForm').submit(() => {
    $('#summonerSearchForm').hide();
    $('#fountainG').show();
  });

  /* reload homepage */
  $('.return').click(() => {
    $.get('/', (data) => document.write(data));
  });
});
