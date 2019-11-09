const request = require('request');

const apiUrl = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const headers = { 'X-Riot-Token': 'RGAPI-1ea0da2b-4e7e-433c-8a95-5888f961b0d9' };

/* GET Search page */
exports.searchGet = (req, res) => {
  res.render('search');
};

/* POST Search page */
exports.searchPost = (req, res) => {
  // TODO: escape user input
  const { summoner } = req.body;

  request({ url: apiUrl + summoner, headers, json: true }, (err, result, next) => {
    if (err) next(err);

    const { puuid } = result.body;
    const { summonerLevel } = result.body;
    const { profileIconId } = result.body;

    res.render('searchResult', {
      summoner, puuid, summonerLevel, profileIconId,
    });
  });
};
