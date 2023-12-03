import { TUser } from './user.interface';
import { User } from './user.model';

// create user
const createUserIntoDB = async (user: TUser) => {
  if (await User.isUserExists(String(user.userId))) {
    throw new Error('User is exist');
  }
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
  console.log(userId, 'sigle item');
  const result = await User.findOne({ userId });
  return result;
};

// Update a user
const updateASingleUser = async (userId: string, userData: TUser) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: userData },
    { new: true, runValidators: true },
  );

  return result;
};

const deleteUser = async (userId: string) => {
  const result = await User.findByIdAndDelete(userId);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsers,
  getASingleUser,
  updateASingleUser,
  deleteUser,
};
