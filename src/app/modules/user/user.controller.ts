import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await UserServices.createUserIntoDB(user);

    const {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = result;

    const data = {
      userId: userId,
      userName: username,
      fullName: fullName,
      age: age,
      email: email,
      isActive: isActive,
      hobbies: hobbies,
      address: address,
    };

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allData = await UserServices.getAllUsers();
    const preResult = allData.map((doc) => {
      const result = {
        userName: doc.username,
        fullName: doc.fullName,
        age: doc.age,
        email: doc.email,
        address: doc.address,
      };
      return result;
    });

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: preResult,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get single user by id
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const result = await UserServices.getASingleUser(userId);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
