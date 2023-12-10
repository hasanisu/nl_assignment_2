import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateUser);
router.put('/:userId/orders', UserController.createOrders);
router.get('/:userId/orders', UserController.getSingleUserOrder);
router.delete('/:userId', UserController.deleteUser);

export const UserRoutes = router;
