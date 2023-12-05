import express from 'express';

import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import productRouter from './product.router.js';

const mainRouter = express.Router();

mainRouter.use('/auth/', authRouter);
mainRouter.use('/userInfo/', userRouter);
mainRouter.use('/', productRouter);

export default mainRouter;
