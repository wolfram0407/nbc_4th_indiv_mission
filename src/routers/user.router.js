import express from 'express';
import 'dotenv/config';

import { isAuthenticated, checkToken } from '../middlewares/auth.middleware.js';

import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';
import { prisma } from '../utils/prisma/index.js';

const { Users } = prisma;
const userRepository = new UserRepository(Users);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = express.Router();
router.get('/', checkToken, isAuthenticated, userController.userInfo);

export default router;
