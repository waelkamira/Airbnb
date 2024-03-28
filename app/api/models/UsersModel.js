import { Schema, model, models } from 'mongoose';
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: { true: 'email is required' },
      unique: true,
    },
    password: {
      type: String,
      required: { true: 'password is required' },
    },
  },
  { timestamps: true }
);

export const User = models?.User || model('User', UserSchema);
