/**
 * @license
 * Copyright Mauricio Gemelli Vigolo. All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.org/mauriciovigolo/tshirt-lottery-pure/LICENSE
 */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    emailConfirmed: { type: Boolean, default: false }
  },
  {
    collection: 'users'
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
