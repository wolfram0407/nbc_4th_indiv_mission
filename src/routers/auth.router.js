import express from 'express';
import 'dotenv/config';
import { redis } from '../config/redis.config.js';
import {
  validate,
  emailValidation,
  passwordValidation,
  passwordConfirmValidation,
  usernameValidation,
} from '../middlewares/validate.middleware.js';
import { AuthController } from '../controllers/auth.controller.js';
import { AuthService } from '../services/auth.service.js';
import { AuthRepository } from '../repositories/auth.repository.js';

import { prisma } from '../utils/prisma/index.js';
const router = express.Router();
const { Users } = prisma;
const authRepository = new AuthRepository(Users, redis);

const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

//
router.post(
  '/signup',
  [
    emailValidation,
    passwordValidation,
    passwordConfirmValidation,
    usernameValidation,
    validate,
  ],
  authController.postSingUp
);

router.post(
  '/login',
  [emailValidation, passwordValidation, validate],
  authController.postLogin
);

export default router;
