import { Schema, model } from 'mongoose';
import { TUser, TUserAddress, TUserFullName } from './user.interface';

const userNameSchema = new Schema<TUserFullName>({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  country: { type: String, trim: true, required: true },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: userNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String] },
  address: { type: userAddressSchema, required: true },
});

// create a model
export const User = model<TUser>('User', userSchema);
