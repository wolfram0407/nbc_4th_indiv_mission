import express from 'express';
import 'dotenv/config';
import { body } from 'express-validator';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import db from '../../models/index.cjs';

import { ProductRepository } from '../repositories/product.repository.js';
import { ProductService } from '../services/product.service.js';
import { ProductController } from '../controllers/product.controller.js';

const { Products, Users, sequelize } = db;

const productRepository = new ProductRepository(Users, Products, sequelize);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = express.Router();

router.get('/products', isAuthenticated, productController.getProducts);

router.get('/product/:productId', isAuthenticated, productController.getProductById);

router.post('/products', isAuthenticated, productController.postProduct);

router.put('/product/:productId', isAuthenticated, productController.updateProduct);

router.delete('/product/:productId', isAuthenticated, productController.deleteProduct);

export default router;
