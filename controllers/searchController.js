const debug = require('debug')('riot_stalker:searchController');
const api = require('../treeline/api');

/* GET Search page */
exports.searchGet = async (req, res) => {
  debug(`${req.method} ${req.url}`);
  res.render('search');
};

/* POST Search page */
exports.searchPost = async (req, res, next) => {
  debug(`${req.method} ${req.url}`);
  const { summoner } = req.body;
  const idNameMapping = await api.idChampionNameMapping().catch(next);
  const idModeMapping = await api.idGameModeMapping().catch(next);
  const summonerResponse = await api.getSummonerByName(summoner).catch(next);
  const leagueResponse = await api.getLeagueEntries(summonerResponse.id).catch(next);
  const matchlistResponse = await api.getMatchlist(summonerResponse.accountId).catch(next);

  debug('%O', leagueResponse[0].queueType);

  res.render('searchResult', {
    summonerResponse,
    matchlistResponse,
    leagueResponse,
    idNameMapping,
    idModeMapping,
  });
};
