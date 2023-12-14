import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema, {
  ordersValidationSchema,
} from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParseData = userValidationSchema.parse(user);
    const result = await UserServices.createUserIntoDB(zodParseData);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.issues ? error.issues[0].message : 'User already exist',
      error: {
        code: 404,
        description: error.issues
          ? error.issues[0].path[0]
          : 'User already exist!',
      },
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
    const id = req.params.userId;
    const result = await UserServices.getASingleUser(id);
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
      message: 'Users fetched successfully',
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Update a single user by id
const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    console.log(id);
    const userData = req.body;
    const result = await UserServices.updateASingleUser(id, userData);
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
      message: 'Users Updated successfully',
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    await UserServices.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'Users deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};

const createOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;
    const zodParseOrderData = ordersValidationSchema.parse(orderData);

    await UserServices.createOrders(userId, zodParseOrderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.issues);
    res.status(400).json({
      success: false,
      message: error.issues ? error.issues[0].message : 'User not found',
      error: {
        code: 400,
        description: error.issues ? error.issues[0].path[0] : 'User not found'!,
      },
    });
  }
};

// Get single order by id
const getSingleUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getASingleUser(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: { orders: result?.orders },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 400,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrders,
  getSingleUserOrder,
};
