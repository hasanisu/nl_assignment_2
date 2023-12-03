import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  UserModel,
} from './user.interface';

const userNameSchema = new Schema<TUserFullName>({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  country: { type: String, trim: true, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: userNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String] },
  address: { type: userAddressSchema, required: true },
});

// userSchema.post('find', async function (next) {
//   this.find({ $match: { fullName: 1 } });
//   next();
// });

// userSchema.statics.isUserExists = async function (userId: string) {
//   const existingUser = await User.findById({ userId });
//   return existingUser;
// };
userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

userSchema.statics.isUserExists = async function (userId) {
  const existUser = await User.findById(userId);
  return existUser;
};

// create a model
export const User = model<TUser, UserModel>('User', userSchema);
