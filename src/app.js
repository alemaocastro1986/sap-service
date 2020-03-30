import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';

const Sentry = require('@sentry/node');

class App {
  constructor() {
    this.server = express();
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    });

    this.middlewares();
    this.routes();
    this.handleErrors();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(helmet());
    this.server.use(
      cors({
        origin: false,
      })
    );
    this.server.use(
      express.json({
        limit: '1000kb',
      })
    );
  }

  routes() {
    this.server.use('/basf', routes);

    this.server.use(Sentry.Handlers.errorHandler());
  }

  handleErrors() {
    this.server.use((err, req, res, next) => {
      return res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: {
          status: err.status || 500,
        },
      });
    });
  }
}

export default new App().server;
