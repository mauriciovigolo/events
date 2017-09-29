import { EmailValidator } from '@orchejs/validators';
import { Property } from '@orchejs/common';
import * as mongoose from 'mongoose';

export class User {
  private _id: string;
  private name: string;
  @Property({ validators: [{ validator: EmailValidator }] })
  private email: string;
  private isEmailConfirmed: boolean;
}

export const userDA = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      name: String,
      email: String,
      isEmailConfirmed: Boolean
    },
    { collection: 'users' }
  )
);
