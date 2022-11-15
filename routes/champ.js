import Router from 'express';
import {champGet, getDetails} from '../controllers/champ-controller.js';

const router = new Router();

/* GET Search page */
router.get('/champ', champGet);
router.get('/champ/*', getDetails);

export default router;
