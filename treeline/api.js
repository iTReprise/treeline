const rp = require('request-promise');
const debug = require('debug')('riot_stalker:api');
const { token } = require('./api_token');

const headers = { 'X-Riot-Token': process.env.TOKEN };

/* Summoner API */

exports.getSummonerByName = async (name) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch();
};

exports.getSummonerByPuuid = async (puuid) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch();
};

exports.getSummonerById = async (id) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${id}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch();
};

exports.getSummonerByAccount = async (account) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${account}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch();
};


/* Match API - todo: tournament routes? */

exports.getMatch = async (matchId) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/match/v4/matches/${matchId}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch();
};

exports.getMatchResult = async (matchId, summonerName) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/match/v4/matches/${matchId}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => {
      const { participantId } = result.participantIdentities
        .find((ele) => ele.player.summonerName === summonerName);
      const { win } = result.participants
        .find((ele) => ele.participantId === participantId).stats;
      return win;
    })
    .catch();
};

exports.getMatchlist = async (accountId, qs) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`,
    qs,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch((err) => {
      /* Don't escalate, because this case is handled in the searchResult */
      if (err.statusCode === 404) return;
      throw err;
    });
};

exports.getMatchTimeline = async (matchId) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch();
};

exports.getChampionData = async (championId) => {
  const options = {
    uri: 'http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/champion.json',
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => Object.values(result.data).find((ele) => ele.key === championId.toString()))
    .catch();
};

exports.getChampions = async (championIds) => {
  const options = {
    uri: 'http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/champion.json',
    headers,
    json: true,
  };

  const champions = await rp(options).catch();
  return Object.values(champions.data).filter((ele) => parseInt(ele.key, 10) in championIds);
};


/* Data Dragon API */

exports.idChampionNameMapping = async (mode) => {
  const options = {
    uri: 'http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/champion.json',
    headers,
    json: true,
  };

  const champions = await rp(options).catch();
  const idNameMapping = {};
  const idNameArray = [];
  Object.values(champions.data).forEach((ele) => {
    idNameMapping[ele.key] = ele.name;
    idNameArray.push({ name: ele.name, id: ele.key });
  });

  if (mode === 'both') return { idNameArray, idNameMapping };
  return mode === 'array' ? idNameArray : idNameMapping;
};

exports.idGameModeMapping = async (mode) => {
  const options = {
    uri: 'http://static.developer.riotgames.com/docs/lol/queues.json',
    headers,
    json: true,
  };

  const queues = await rp(options).catch();

  /* Return array, if specified by function parameter */
  if (mode === 'array') return queues.filter((ele) => ele.notes == null);

  const idModeMapping = [];
  queues.forEach((ele) => {
    if (ele.queueId !== 0) {
      if (ele.notes != null && ele.notes.toLowerCase().includes('deprecated')) {
        return;
      }
      idModeMapping[ele.queueId] = ele.description.replace(/( games)/, '');
    }
  });

  /* Normal return (map: key = id, value = queue name */
  return idModeMapping;
};

exports.seasonsMapping = async () => {
  const options = {
    uri: 'http://static.developer.riotgames.com/docs/lol/seasons.json',
    headers,
    json: true,
  };

  return rp(options).catch();
};

/* League API - todo: lots of stuff */

exports.getLeagueEntries = async (encSummonerId) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encSummonerId}`,
    headers,
    json: true,
  };

  return rp(options).catch();
};
