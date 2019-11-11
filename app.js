const express = require('express');
const createError = require('http-errors');
const path = require('path');

/* Import Routes */
const searchRouter = require('./routes/search');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', searchRouter);

/* Catch 404 and forward to error handler */
app.use((req, res, next) => next(createError(404)));

/* Error handler */
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  console.log(err);
  res.render('error');
});

module.exports = app;
