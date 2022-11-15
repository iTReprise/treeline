import process from 'node:process';
import rp from 'request-promise';
import debugModule from 'debug';

const debug = debugModule('treeline:api');
debug.enabled = true;

const headers = {'X-Riot-Token': process.env.TOKEN};

/* Summoner API */
const getSummonerByName = async name => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
    headers,
    json: true,
  };

  return rp(options)
    .then(result => result)
    .catch();
};

const getSummonerByPuuid = async puuid => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    headers,
    json: true,
  };

  return rp(options)
    .then(result => result)
    .catch();
};

const getSummonerById = async id => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${id}`,
    headers,
    json: true,
  };

  return rp(options)
    .then(result => result)
    .catch();
};

const getSummonerByAccount = async account => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${account}`,
    headers,
    json: true,
  };

  return rp(options)
    .then(result => result)
    .catch();
};

/* Match API - todo: tournament routes? */
const getMatch = async matchId => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/match/v4/matches/${matchId}`,
    headers,
    json: true,
  };

  return rp(options)
    .then(result => result)
    .catch();
};

const getMatchResult = async (matchId, summonerName) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/match/v4/matches/${matchId}`,
    headers,
    json: true,
  };

  return rp(options)
    .then(result => {
      const {participantId} = result.participantIdentities
        .find(element => element.player.summonerName === summonerName);
      const {win} = result.participants
        .find(element => element.participantId === participantId).stats;
      return win;
    })
    .catch();
};

const getMatchlist = async (accountId, qs) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`,
    qs,
    headers,
    json: true,
  };

  return rp(options)
    .then(result => result)
    .catch(error => {
      /* Don't escalate, because this case is handled in the searchResult */
      if (error.statusCode === 404) {return;}
      throw error;
    });
};

const getMatchTimeline = async matchId => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}`,
    headers,
    json: true,
  };

  return rp(options)
    .then(result => result)
    .catch();
};

/* Data Dragon API */
const getChampionData = async champion => {
  const options = {
    uri: `http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion/${champion}.json`,
    headers,
    json: true,
  };

  return rp(options).catch();
};

const getChampions = async championIds => {
  const options = {
    uri: 'http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion.json',
    headers,
    json: true,
  };

  const champions = await rp(options).catch();
  if (championIds) {
    return Object.values(champions.data).filter(element => championIds.includes(Number.parseInt(element.key, 10)));
  }

  return champions;
};

const idChampionNameMapping = async mode => {
  const options = {
    uri: 'http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion.json',
    headers,
    json: true,
  };

  const champions = await rp(options).catch();
  const idNameMapping = {};
  const idNameArray = [];
  for (const element of Object.values(champions.data)) {
    idNameMapping[element.key] = element.name;
    idNameArray.push({name: element.name, id: element.key});
  }

  if (mode === 'both') {return {idNameArray, idNameMapping};}
  return mode === 'array' ? idNameArray : idNameMapping;
};

const idGameModeMapping = async mode => {
  const options = {
    uri: 'http://static.developer.riotgames.com/docs/lol/queues.json',
    headers,
    json: true,
  };

  const queues = await rp(options).catch();

  /* Return array, if specified by function parameter */
  if (mode === 'array') {return queues.filter(element => element.notes === null);}

  const idModeMapping = [];
  for (const element of queues) {
    if (element.queueId !== 0) {
      if (element.notes !== null && element.notes.toLowerCase().includes('deprecated')) {
        continue;
      }

      idModeMapping[element.queueId] = element.description.replace(/( games)/, '');
    }
  }

  /* Normal return (map: key = id, value = queue name */
  return idModeMapping;
};

const seasonsMapping = async () => {
  const options = {
    uri: 'http://static.developer.riotgames.com/docs/lol/seasons.json',
    headers,
    json: true,
  };

  return rp(options).catch();
};

/* League API - todo: lots of stuff */

const getLeagueEntries = async encSummonerId => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encSummonerId}`,
    headers,
    json: true,
  };

  return rp(options).catch();
};

const api = {
  getSummonerByName, getSummonerByPuuid, getSummonerById, getSummonerByAccount,
  getMatch, getMatchResult, getMatchlist, getMatchTimeline,
  getChampionData, getChampions,
  idChampionNameMapping, idGameModeMapping, seasonsMapping, getLeagueEntries,
};

export default api;
