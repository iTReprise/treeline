const debug = require('debug')('riot_stalker:champController');
const api = require('../treeline/api');

/* GET Search page */
exports.champGet = async (req, res, next) => {
  debug(`${req.method} ${req.url}`);

  api.getChampions() // remove parameter for full champ list
    .then((result) => res.render('champ', { result }))
    .catch(next);
};

/* GET Specific champion */
exports.getDetails = async (req, res, next) => {
  debug(`${req.method} ${req.url}`);
  const champId = req.url.split('/')[2];

  api.getChampionData(champId)
    .then((result) => {
      debug('%o', result.data[champId]);
      res.render('test', { result });
    })
    .catch(next);
};
