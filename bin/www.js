#!/usr/bin/env node
import process from 'node:process';
import http from 'node:http';
import debugModule from 'debug';
import * as dotenv from 'dotenv';
import app from '../app.js';

dotenv.config();
const debug = debugModule('treeline:server');
debug.enabled = true;

function normalizePort(value) {
  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue)) { return value; }
  if (parsedValue >= 0) { return parsedValue; }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') { throw error; }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `Pipe ${addr}`
    : `Port ${addr.port}`;

  debug(`Listening on ${bind}`);
}

/* Get port from environment */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
