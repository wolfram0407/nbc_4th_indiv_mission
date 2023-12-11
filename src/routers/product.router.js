import express from 'express';
import 'dotenv/config';
import {
  checkToken,
  isAuthenticated,
} from '../middlewares/Authentication.middleware.js';
import { checkProductOwner } from '../middlewares/Authorization.middleware.js';
import {
  validate,
  titleValidation,
  contentsValidation,
  priceValidation,
  statusValidation,
} from '../middlewares/validate.middleware.js';

import { ProductRepository } from '../repositories/product.repository.js';
import { ProductService } from '../services/product.service.js';
import { ProductController } from '../controllers/product.controller.js';

import { prisma } from '../utils/prisma/index.js';

const { Products, Users } = prisma;

const productRepository = new ProductRepository(Users, Products);
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
  [titleValidation, contentsValidation, priceValidation, validate],
  productController.postCreateProduct
);

router.put(
  '/product/:productId',
  checkToken,
  isAuthenticated,
  checkProductOwner,
  [
    titleValidation,
    contentsValidation,
    priceValidation,
    statusValidation,
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
