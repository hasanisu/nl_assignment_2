import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  TOrders,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserFullName>({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  country: { type: String, trim: true, required: true },
});

const OrdersSchema = new Schema<TOrders>({
  productName: {
    type: String,
    trim: true,
    required: [true, 'Product Name should be string'],
  },
  price: { type: Number, required: [true, 'Price should be Number'] },
  quantity: { type: Number, required: [true, 'Quantity should be Number'] },
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
  orders: { type: [OrdersSchema] },
});

userSchema.statics.isUserExists = async function (userId) {
  const existUser = await User.findById(userId);
  return existUser;
};

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.deleteOne({ userId });
  return existingUser;
};

userSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { orders: { $eq: true } } });
  next();
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// create a model
export const User = model<TUser, UserModel>('User', userSchema);
