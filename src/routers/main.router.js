import express from 'express';
import { redis } from '../config/redis.config.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import productRouter from './product.router.js';

redis.on('connect', () => {
  console.info('Redis connected!');
});
redis.on('error', err => {
  console.error('Redis Client Error', err);
});
// 연결 종료 이벤트
redis.on('end', () => {
  console.log('Redis Disconnected');
});

const mainRouter = express.Router();

mainRouter.use('/auth/', authRouter);
mainRouter.use('/userInfo/', userRouter);
mainRouter.use('/', productRouter);

export default mainRouter;
