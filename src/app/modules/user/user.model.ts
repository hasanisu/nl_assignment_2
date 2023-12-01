import mongoose, { Schema, model } from 'mongoose';
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

// userSchema.post('find', async function (next) {
//   this.find({ $match: { fullName: 1 } });
//   next();
// });

userSchema.statics.isUserExists = async function (id: string) {
  // console.log(mongoose.Types.ObjectId())
  // const existingUser = await User.find(mongoose.Types.ObjectId(id));
  // return existingUser;
};

// create a model
export const User = model<TUser, UserModel>('User', userSchema);
