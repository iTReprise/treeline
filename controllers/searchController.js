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
  const { champion } = req.body;
  const { queue } = req.body;
  const { season } = req.body;
  const idNameBoth = await api.idChampionNameMapping('both').catch(next);
  const idModeMapping = await api.idGameModeMapping().catch(next);
  const seasonsMapping = await api.seasonsMapping().catch(next);
  const summonerResponse = await api.getSummonerByName(summoner).catch(next);
  const leagueResponse = await api.getLeagueEntries(summonerResponse.id).catch(next);
  const matchlistResponse = await api.getMatchlist(summonerResponse.accountId, { champion, queue, season }).catch(next);

  const { idNameMapping } = idNameBoth;
  const { idNameArray } = idNameBoth;

  res.render('searchResult', {
    summonerResponse,
    matchlistResponse,
    leagueResponse,
    idNameMapping,
    idModeMapping,
    seasonsMapping,
    idNameArray,
  });
};
