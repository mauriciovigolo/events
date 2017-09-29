import { Server } from 'http';
import * as bodyParser from 'body-parser';
import { LotteryDB } from './config/lottery.db';
import { ExpressSettings, OrcheRest, OrcheRestConfig, OrcheRestResult } from '@orchejs/rest';

export class LotteryServer {
  private server: Server;

  constructor() {
    this.init();
  }

  private async init() {
    // Mongodb initialization
    await this.loadMongoDB();

    // Routes initialization
    const config: OrcheRestConfig = {
      path: 'lottery',
      debug: true,
      middlewares: this.addMiddlewares(),
      settings: this.addSettings(),
      port: 4201
    };

    const orche = new OrcheRest();
    let result = await orche.init(config);

    console.log('Server started on port 4201');
  }

  private addMiddlewares(): any[] {
    // Adding all middlewares
    const middlewares: any[] = [];
    middlewares.push(bodyParser.json());
    
    return middlewares;
  }

  private addSettings(): ExpressSettings {
    // Express settings
    const exSettings: ExpressSettings = {
      xPoweredBy: false
    };

    return exSettings;
  }

  private async loadMongoDB(): Promise<void> {
    let lotteryDB = new LotteryDB();
    await lotteryDB.init();
  }
}

let lotteryServer: LotteryServer = new LotteryServer();
