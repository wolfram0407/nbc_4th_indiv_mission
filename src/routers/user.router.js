import express from 'express';
import 'dotenv/config';
import db from '../../models/index.cjs';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';

const { Users } = db;
const userRepository = new UserRepository(Users);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = express.Router();
router.get('/', isAuthenticated, userController.userInfo);

export default router;
