import debugModule from 'debug';
import api from '../treeline/api.js';

const debug = debugModule('treeline:champ-controller');
debug.enabled = true;

/* GET Search page */
const champGet = async (request, result, next) => {
  debug(`${request.method} ${request.url}`);

  api.getChampions() // Remove parameter for full champ list
    .then(r => result.render('champ', {r}))
    .catch(next);
};

/* GET Specific champion */
const getDetails = async (request, result, next) => {
  debug(`${request.method} ${request.url}`);
  const champId = request.url.split('/')[2];

  api.getChampionData(champId)
    .then(r => {
      result.render('test', {r});
    })
    .catch(next);
};

export {champGet, getDetails};
