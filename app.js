import {join} from 'node:path';
import process from 'node:process';
import dotenv from 'dotenv';
import express from 'express';
import createError from 'http-errors';
import debugModule from 'debug';

/* Import Routes */
import searchRouter from './routes/search.js';
import champRouter from './routes/champ.js';

dotenv.config();
const debug = debugModule('treeline:app');
debug.enabled = true;

const app = express();
app.set('views', join(process.cwd(), 'views'));
app.set('view engine', 'pug');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(join(process.cwd(), 'public')));

app.get('/', (request, result) => result.redirect('/search'));
app.use('/', searchRouter);
app.use('/', champRouter);

/* Catch 404 and forward to error handler */
app.use((request, result, next) => next(createError(404)));

/* Error handler */
// eslint-disable-next-line no-unused-vars
app.use((error, request, result, next) => {
  result.locals.message = error.message;
  result.locals.error = request.app.get('env') === 'development' ? error : {};

  debug('%O', error);

  result.status(error.status || 500);
  result.render('error');
});

export default app;
