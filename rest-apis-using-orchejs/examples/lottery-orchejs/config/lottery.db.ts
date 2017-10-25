/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/mauriciovigolo/ftsl-2017/LICENSE
 */
import * as mongoose from 'mongoose';

export class LotteryDB {
  private db: any;
  private secrets: any;

  constructor() {
    this.secrets = require('../../secrets/mongodb.json');
    this.init();
  }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.db && (this.db.readyState === 1 || this.db.readyState === 2)) {
        resolve();
        return;
      }

      const options = {
        promiseLib: global.Promise,
        server: {
          useMongoClient: true,
          keepAlive: true,
          reconnectInterval: 1000
        },
        config: {
          autoIndex: true
        }
      };

      const uri = this.secrets.lottery.uri;
      mongoose.connect(uri, options);

      this.db = mongoose.connection;
      this.db.on('error', err => {
        reject(err);
      });
      this.db.on('open', () => {
        mongoose.set('debug', true);
        resolve();
      });
    });
  }
}
