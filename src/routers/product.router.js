import express from 'express';
import 'dotenv/config';
import { body } from 'express-validator';
import {
  checkToken,
  isAuthenticated,
  checkProductOwner,
} from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

import db from '../../models/index.cjs';

import { ProductRepository } from '../repositories/product.repository.js';
import { ProductService } from '../services/product.service.js';
import { ProductController } from '../controllers/product.controller.js';

const { Products, Users, sequelize } = db;

const productRepository = new ProductRepository(Users, Products, sequelize);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = express.Router();

router.get(
  '/products',
  checkToken,
  isAuthenticated,
  productController.getAllProducts
);

router.get(
  '/product/:productId',
  checkToken,
  isAuthenticated,
  productController.getFindProductById
);

router.post(
  '/products',
  checkToken,
  isAuthenticated,
  [
    body('title').trim().notEmpty().withMessage('title를 확인해주세요.'),
    body('contents').trim().notEmpty().withMessage('contents를 확인해주세요.'),
    body('price').trim().notEmpty().withMessage('price를 확인해주세요.'),
    validate,
  ],
  productController.postCreateProduct
);

router.put(
  '/product/:productId',
  checkToken,
  isAuthenticated,
  checkProductOwner,
  [
    body('title').trim().notEmpty().withMessage('title를 확인해주세요.'),
    body('contents').trim().notEmpty().withMessage('contents를 확인해주세요.'),
    body('price').trim().notEmpty().withMessage('price를 확인해주세요.'),
    body('status').trim().notEmpty().withMessage('status를 확인해주세요.'),
    validate,
  ],
  productController.postUpdateProduct
);

router.delete(
  '/product/:productId',
  checkToken,
  isAuthenticated,
  checkProductOwner,
  productController.postDeleteProduct
);

export default router;
