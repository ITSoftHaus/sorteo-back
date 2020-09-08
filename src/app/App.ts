import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import cookieParse from 'cookie-parser';
import * as path from 'path';
import mongoose from 'mongoose';

import IApplicationConfig from './core/IApplicationConfig';
import AppRoutes from './routes/AppRoutes';
import AppDataProviders from './providers/AppDataProviders';
import AppDataLoaders from './modules/dataloader/loaders/AppDataLoaders';
import AppDataProcessors from './modules/mining/dataprocessing/AppDataProcessors';
import AppDataMinings from './modules/mining/datamining/AppDataMinings';

var sessionNedbStore = require('nedb-session-store')(session);

require('dotenv').config({ path: '.env' });

export default class App {
  /**
   * Store da applicação onde ficarão os sessions da aplicação
   */
  private static readonly ROOT_SESSION_STORE = path.normalize(
    __dirname + process.env.ROOT_SESSION_STORE_PATH
  );

  /**
   * App instance
   */
  private static app: App;

  /**
   * Express instance
   */
  private expApp: Express;

  /**
   * DataProviders instance
   */
  private dataProviders: AppDataProviders;

  /**
   * DataLoaders instance
   */
  private dataLoaders: AppDataLoaders;

  /**
   * DataProcessors instance
   */
  private dataProcessors: AppDataProcessors;

  /**
   * DataMinings instance
   */
  private dataMinings: AppDataMinings;

  public static getInstance(): App {
    return App.app;
  }

  constructor(private config: IApplicationConfig) {
    if (App.app instanceof App) {
      throw new Error(
        'Não é possível criar mais de uma instância do aplicativo!'
      );
    }

    this.config = config;
    this.expApp = express();
    this.setupMongoConfig();
    App.app = this;
  }

  private setupMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_URL_SRV, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  private sessionStore: session.Store = new sessionNedbStore({
    filename: App.ROOT_SESSION_STORE + 'sessions.db'
  });

  /**
   * Inicializando e executando o aplicativo
   */
  run(): void {
    this.expApp.use(
      session({
        store: this.sessionStore,
        secret: process.env.SECRET_APP,
        resave: true,
        cookie: {
          path: '/',
          httpOnly: true,
          maxAge: 365 * 24 * 60 * 60 * 1000,
          secure: true
        },
        saveUninitialized: true
      })
    );

    this.expApp.use(bodyParser.urlencoded({ extended: false }));

    this.expApp.use((_req: Request, res: Response, next: NextFunction) => {
      res.contentType('application/json');
      next();
    });

    this.expApp.use(cookieParse());
    this.expApp.use(logger('dev'));
    this.expApp.use(helmet());

    this.dataProviders = new AppDataProviders();

    this.dataLoaders = new AppDataLoaders();

    this.dataProcessors = new AppDataProcessors();

    this.dataMinings = new AppDataMinings(this);

    let appRouter = new AppRoutes();

    appRouter.mount(this.expApp);

    this.expApp.listen(this.config.listenPort, err => {
      if (err !== undefined) {
        console.log(err);
      } else {
        console.log('Server run on port: ' + this.config.listenPort);
      }
    });
  }

  get providers(): AppDataProviders {
    return this.dataProviders;
  }

  get loaders(): AppDataLoaders {
    return this.dataLoaders;
  }

  get processors(): AppDataProcessors {
    return this.dataProcessors;
  }

  get minings(): AppDataMinings {
    return this.dataMinings;
  }
}
