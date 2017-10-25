/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.org/mauriciovigolo/tshirt-lottery-pure/LICENSE
 */
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const LotteryDB = require('./lottery.db');
const User = require('./user.model');

// App Initialization
const app = express();

// Middlewares
app.use(bodyParser.json());

// BD Initialization
const db = new LotteryDB();
db
  .init()
  .then(() => {
    addRoutes();
    initApp();
  })
  .catch(error => {
    console.log('An error happened during initialization', error);
  });

// Routes Initialization
const addRoutes = function() {
  // -> User registration
  const userRouter = express.Router();

  userRouter.post('', (req, res, next) => {
    const user = req.body;

    if (!user) {
      res.status(400).send('User data was blank');
      return;
    }

    /*
     * Should validate the data here before insert here, i.e: email, name...
     * Validations were not done here...
     */

    User.create(user)
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  userRouter.put('/:uuid', (req, res, next) => {
    const uuid = req.params['uuid'];
    const user = req.body;

    if (!uuid || !user) {
      res.status(400).send('User uuid or data to be updated was/were blank');
      return;
    }

    /*
     * Should validate the data here before update here, i.e: email, name...
     * Validations were not done here...
     */

    User.update(uuid, user)
      .then(user => {
        res.status(201).send(user);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  userRouter.get('/:uuid', (req, res, next) => {
    const uuid = req.params['uuid'];
    if (!uuid) {
      res.status(400).send('UUID must be informed');
      return;
    }

    User.findById(uuid)
      .then(user => {
        res.status(204).send(user);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  userRouter.delete('/:uuid', (req, res, next) => {
    const uuid = req.params['uuid'];
    if (!uuid) {
      res.status(400).send('UUID must be informed');
      return;
    }

    User.findOneAndRemove(uuid)
      .then(() => {
        res.status(204).send();
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });  

  userRouter.get('', (req, res, next) => {
    let query = {};

    let from = req.query['from'];
    if (from) {
      from = moment(from, 'YYYY-MM-DD HH:mm:ss');
      query.registered = { $gte: from };
    }

    let until = req.query['until'];
    if (until) {
      until = moment(until, 'YYYY-MM-DD HH:mm:ss');
      query.until = { $lte: until };
    }

    let name = req.query['name'];
    if (name) {
      query.name = { $regex: `.*${name}.*`, $options: 'i' };
    }

    let start = req.query['start'] || 0;
    let size = req.query['size'] || 10;

    User.find(query)
      .skip(start)
      .limit(size)
      .then(users => {
        res.status(200).send(users);
      });
  });

  app.use('/orchejs-lottery/users', userRouter);
};

// App Initialization
const initApp = function() {
  app.listen(4200, function() {
    console.log('App running on port: 4200');
  });
};
