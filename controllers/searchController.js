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

  const callAPI = async () => {
    const summonerResponse = await api.getSummonerByName(summoner);
    const leagueResponse = await api.getLeagueEntries(summonerResponse.id);
    const matchlistResponse = await api.getMatchlist(summonerResponse.accountId, { champion, queue, season });
    const idNameBoth = await api.idChampionNameMapping('both');
    const idModeMapping = await api.idGameModeMapping();
    const seasonsMapping = await api.seasonsMapping();

    return {
      summonerResponse,
      leagueResponse,
      matchlistResponse,
      idNameBoth,
      idModeMapping,
      seasonsMapping,
    };
  };

  callAPI()
    .then((result) => {
      res.render('searchResult', { result });
    })
    .catch(next);
};
