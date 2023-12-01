import { TUser } from './user.interface';
import { User } from './user.model';

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

const getASingleUser = async (id: string) => {
  const result = await User.findById(id);
  // const result = await User.aggregate([{ $match: { id: id } }]);
  console.log(result, 'valo');
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsers,
  getASingleUser,
};
