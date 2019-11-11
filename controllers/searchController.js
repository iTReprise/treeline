const api = require('../treeline/api');

/* GET Search page */
exports.searchGet = async (req, res) => {
  res.render('search');
};

/* POST Search page */
exports.searchPost = async (req, res, next) => {
  const { summoner } = req.body;
  const idNameMapping = await api.idChampionNameMapping();
  const idModeMapping = await api.idGameModeMapping();
  const summonerResponse = await api.getSummonerByName(summoner).catch(next);
  const matchlistResponse = await api.getMatchlist(summonerResponse.accountId).catch(next);

  res.render('searchResult', {
    summonerResponse,
    matchlistResponse,
    idNameMapping,
    idModeMapping,
  });
};
