import http from 'http';
import logger from './services/logger';
import initApplication from './app';
import { config } from './config';

const { port } = config;

initApplication().then((app) => {
  app.set('port', port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address?.port}`;
    logger.info(`Listening on ${bind}`);
  }

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('listening', onListening);

  // TODO Add proper error handling
  server.on('error', (error: Error) => {
    logger.error(error);
    throw Error;
  });
});
