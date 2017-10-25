/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.org/mauriciovigolo/tshirt-lottery-pure/LICENSE
 */
const mongoose = require('mongoose');
const secrets = require('../secrets/mongodb.json');

const LotteryDB = function() {
  let db;
};

LotteryDB.prototype.init = function() {
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
        reconnectInterval: 1000,
      },
      config: {
        autoIndex: true
      }
    }
  
    const uri = secrets.lottery.uri;

    mongoose.Promise = options.promiseLib;
    mongoose.connect(uri, options);
    this.db = mongoose.connection;

    this.db.on('error', (err) => {
      reject(err);
    });

    this.db.on('open', () => {
      mongoose.set('debug', true);
      resolve();
    });
  });
}

module.exports = LotteryDB;