/* global $ */

$(() => {
  /* Show loading icon when searching */
  $('#summonerSearchForm').on(() => {
    $('#summonerSearchForm').hide();
    $('#fountainG').show();
  });

  /* Show loading icon when filtering */
  $('#summonerSearchFilter').on(() => {
    $('#summonerSearchFilter').hide();
    $('#fountainG').show();
  });
});
