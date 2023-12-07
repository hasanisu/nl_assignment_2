import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  TOrders,
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

const OrdersSchema = new Schema<TOrders>({
  productName: { type: String, trim: true, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
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

// userSchema.post('find', async function (next) {
//   this.find({ $match: { fullName: 1 } });
//   next();
// });

// userSchema.statics.isUserExists = async function (userId: string) {
//   const existingUser = await User.findById({ userId });
//   return existingUser;
// };
// userSchema.statics.isUserExists = async function (userId: string) {
//   const existingUser = await User.findOne({ userId });
//   return existingUser;
// };

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

// userSchema.pre('aggregate', async function (next) {
//   this.pipeline().unshift(
//     { $match: { orders: { $av: true } } },
//     {$match: {price: }}

//     );

//   next();
// });

// create a model
export const User = model<TUser, UserModel>('User', userSchema);
