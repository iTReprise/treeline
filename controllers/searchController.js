const api = require('../treeline/api');

/* GET Search page */
exports.searchGet = (req, res) => {
  res.render('search');
};

/* POST Search page */
exports.searchPost = (req, res, next) => {
  const { summoner } = req.body;

  api.getSummonerByName(summoner)
    .then((result) => {
      res.render('searchResult', { result });
    })
    .catch(next);
};
