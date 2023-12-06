import jwt from 'jsonwebtoken';
import 'dotenv/config';
import db from '../../models/index.cjs';
const { Products } = db;
export const isAuthenticated = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  // accessToken verified
  if (!accessToken) {
    return next(new Error('accessTokenNotFound')); //
  }
  const verifiedAccessToken = verifyAccessToken(accessToken);

  if (!verifiedAccessToken) {
    return next(new Error('accessTokenNotMatched'));
  }
  req.user = verifiedAccessToken;
  next();
};
export const checkProductOwner = async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.user.id;
  const product = await Products.findByPk(productId);
  if (!product) {
    return next(new Error('notFoundProduct'));
  }
  if (userId !== product.userId) {
    return next(new Error('Forbidden'));
  }
  req.product = productId;
  next();
};

function verifyAccessToken(accessTokenToken) {
  try {
    return jwt.verify(accessTokenToken, process.env.SECRETTEXT);
  } catch (error) {
    return false;
  }
}
