import 'dotenv/config';
import { prisma } from '../utils/prisma/index.js';
const { Products } = prisma;

export const checkProductOwner = async (req, res, next) => {
  const productId = req.params.productId;
  const userId = res.locals.user;
  const product = await Products.findFirst({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    return next(new Error('notFoundProduct'));
  }
  if (userId !== product.userId) {
    return next(new Error('Forbidden'));
  }

  res.locals.product = productId;
  next();
};
