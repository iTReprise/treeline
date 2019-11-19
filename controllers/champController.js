const debug = require('debug')('riot_stalker:champController');
const api = require('../treeline/api');

/* GET Search page */
exports.champGet = async (req, res, next) => {
  debug(`${req.method} ${req.url}`);

  api.getChampions([84, 39, 40, 235]) // remove parameter for full champ list
    .then((result) => {
      res.render('champ_test', { result });
    })
    .catch(next);
};
