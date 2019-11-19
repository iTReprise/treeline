const express = require('express');
const champController = require('../controllers/champController');

const router = express.Router();

/* GET Search page */
router.get('/champ', champController.champGet);

module.exports = router;
