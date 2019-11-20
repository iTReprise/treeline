/* global $ */

$(() => {
  /* show loading icon when searching */
  $('#summonerSearchForm').submit(() => {
    $('#summonerSearchForm').hide();
    $('#fountainG').show();
  });

  /* show loading icon when filtering */
  $('#summonerSearchFilter').submit(() => {
    $('#summonerSearchFilter').hide();
    $('#fountainG').show();
  });
});
