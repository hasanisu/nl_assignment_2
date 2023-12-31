import { TUser, TOrders } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import config from '../../config';

// create user
const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

// Get all users
const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

//Get a single user
const getASingleUser = async (userId: string) => {
  const result = await User.findOne({ userId });
  if (!result) {
    throw new Error('User Does Not Exist');
  }
  return result;
};

// Update a user
const updateASingleUser = async (userId: string, userData: TUser) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: userData },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new Error('User Does Not Exist');
  }
  return result;
};

const deleteUser = async (userId: string) => {
  const result = await User.findOneAndDelete({ userId });
  if (!result) {
    throw new Error('User Does`t Exist');
  }
  return result;
};

//orders
const createOrders = async (userId: string, orders: TOrders) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $addToSet: { orders: orders } },
    { new: true, runValidators: true },
  );
  if (!result) {
    throw new Error('User Does Not Exist');
  }

  return result;
};

//Get a single user
const getASingleUserOrder = async (userId: string) => {
  const result = await User.findOne({ userId });
  if (!result) {
    throw new Error('User Does Not Exist');
  }
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsers,
  getASingleUser,
  updateASingleUser,
  deleteUser,
  createOrders,
  getASingleUserOrder,
};
