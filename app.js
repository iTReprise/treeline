const express = require('express');
const createError = require('http-errors');
const path = require('path');
const debug = require('debug')('riot_stalker:app');

/* Import Routes */
const searchRouter = require('./routes/search');
const champRouter = require('./routes/champ');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
if (app.get('env') === 'development') app.locals.pretty = true;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/search'));
app.use('/', searchRouter);
app.use('/', champRouter);

/* Catch 404 and forward to error handler */
app.use((req, res, next) => next(createError(404)));

/* Error handler */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  debug('%O', err.message);

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
