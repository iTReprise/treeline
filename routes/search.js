import Router from 'express';
import {searchGet, searchPost} from '../controllers/search-controller.js';

const router = new Router();

/* GET Search page */
router.get('/search', searchGet);

/* POST Search page */
/* Escape user input? */
router.post('/search', searchPost);

export default router;
