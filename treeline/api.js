const rp = require('request-promise');

const headers = { 'X-Riot-Token': 'RGAPI-91d3dd51-d25d-44c9-a894-a8c542918d94' };

/* Summoner API */

exports.getSummonerByName = async (name) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch((err) => { throw new Error(`Error in API call: ${err}`); });
};

exports.getSummonerByPuuid = async (puuid) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch((err) => { throw new Error(`Error in API call: ${err}`); });
};

exports.getSummonerById = async (id) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${id}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch((err) => { throw new Error(`Error in API call: ${err}`); });
};

exports.getSummonerByAccount = async (account) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${account}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch((err) => { throw new Error(`Error in API call: ${err}`); });
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
    .catch((err) => { throw new Error(`Error in API call: ${err}`); });
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
    .catch((err) => { throw new Error(`Error in API call: ${err}`); });
};

exports.getMatchTimeline = async (matchId) => {
  const options = {
    uri: `https://euw1.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}`,
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => result)
    .catch((err) => { throw new Error(`Error in API call: ${err}`); });
};

exports.getChampionData = async (championId) => {
  const options = {
    uri: 'http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/champion.json',
    headers,
    json: true,
  };

  return rp(options)
    .then((result) => Object.values(result.data).find((ele) => ele.key === championId.toString()))
    .catch((err) => { throw new Error(`Error in API call: ${err}`); });
};

exports.getChampions = async (championIds) => {
  const options = {
    uri: 'http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/champion.json',
    headers,
    json: true,
  };

  const champions = await rp(options).catch((err) => { throw new Error(`Error in API call: ${err}`); });
  return Object.values(champions.data).filter((ele) => parseInt(ele.key, 10) in championIds);
};

exports.idChampionNameMapping = async () => {
  const options = {
    uri: 'http://ddragon.leagueoflegends.com/cdn/9.22.1/data/en_US/champion.json',
    headers,
    json: true,
  };

  const champions = await rp(options).catch((err) => { throw new Error(`Error in API call: ${err}`); });
  const idNamesMapping = {};
  Object.values(champions.data).forEach((ele) => {
    idNamesMapping[ele.key] = ele.name;
  });

  return idNamesMapping;
};

exports.idGameModeMapping = async () => {
  const options = {
    uri: 'http://static.developer.riotgames.com/docs/lol/queues.json',
    headers,
    json: true,
  };

  const queues = await rp(options).catch((err) => { throw new Error(`Error in API call: ${err}`); });
  const idModeMapping = {};
  queues.forEach((ele) => {
    if (ele.queueId !== 0) {
      idModeMapping[ele.queueId] = ele.description.replace(/( games)/, '');
    }
  });

  return idModeMapping;
};
