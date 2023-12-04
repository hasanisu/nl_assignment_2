import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.get('/all-users', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateUser);
router.put('/:userId/orders', UserController.createOrders);
router.delete('/:userId', UserController.deleteUser);

export const UserRoutes = router;
