import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

function verifyAccessToken(accessTokenToken) {
  try {
    return jwt.verify(accessTokenToken, process.env.SECRETTEXT);
  } catch (error) {
    return false;
  }
}
