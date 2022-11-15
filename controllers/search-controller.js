import debugModule from 'debug';
import api from '../treeline/api.js';

const debug = debugModule('treeline:search-controller');
debug.enabled = true;

/* GET Search page */
const searchGet = async (request, result) => {
  debug(`${request.method} ${request.url}`);
  result.render('search');
};

/* POST Search page */
const searchPost = async (request, result, next) => {
  debug(`${request.method} ${request.url}`);

  const {summoner} = request.body;
  const {champion} = request.body;
  const {queue} = request.body;
  const {season} = request.body;

  const callAPI = async () => {
    const summonerResponse = await api.getSummonerByName(summoner);
    const leagueResponse = await api.getLeagueEntries(summonerResponse.id);
    const matchlistResponse = await api.getMatchlist(summonerResponse.accountId, {champion, queue, season});
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
    .then(result => {
      result.render('searchResult', {result});
    })
    .catch(next);
};

export {searchGet, searchPost};
