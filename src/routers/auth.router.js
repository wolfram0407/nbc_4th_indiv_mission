import express from 'express';
import 'dotenv/config';
import { body } from 'express-validator';
import { redis } from '../config/redis.config.js';
import db from '../../models/index.cjs';
import { validate } from '../middlewares/validate.middleware.js';
import { AuthController } from '../controllers/auth.controller.js';
import { AuthService } from '../services/auth.service.js';
import { AuthRepository } from '../repositories/auth.repository.js';

const router = express.Router();
const { Users } = db;

const authRepository = new AuthRepository(Users, redis);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post(
  '/signup',
  [
    body('email')
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage('email을 확인해주세요.'),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('password를 확인해주세요.'),
    body('passwordConfirm')
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('passwordConfirm를 확인해주세요.'),
    body('username').trim().notEmpty().withMessage('username 을 입력해주세요.'),
    validate,
  ],
  authController.postSingUp
);

router.post(
  '/login',
  [
    body('email')
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage('email을 확인해주세요.'),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('password를 확인해주세요.'),
    validate,
  ],
  authController.postLogin
);
export default router;
