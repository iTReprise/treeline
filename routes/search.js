const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

/* GET Search page */
router.get('/', searchController.searchGet);

/* POST Search page */
router.post('/', searchController.searchPost);

module.exports = router;
