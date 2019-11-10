const rp = require('request-promise');

const headers = { 'X-Riot-Token': 'RGAPI-1ea0da2b-4e7e-433c-8a95-5888f961b0d9' };

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

/* Match API - todo: tournament routes */

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
