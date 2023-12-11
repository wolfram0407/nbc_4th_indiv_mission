import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { redis } from '../config/redis.config.js';

export const checkToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !refreshToken) {
    return next(new Error('Need login')); //
  }
  res.locals.accessToken = accessToken;
  res.locals.refreshToken = refreshToken;
  next();
};

export const isAuthenticated = async (req, res, next) => {
  const accessToken = res.locals.accessToken;
  const refreshToken = res.locals.refreshToken;

  const verifiedAccessToken = verifyAccessToken(accessToken);

  if (verifiedAccessToken) {
    res.locals.user = verifiedAccessToken.id;
    return next();
  }

  const verifiedRefreshToken = verifyRefreshToken(refreshToken);

  if (!verifiedRefreshToken) {
    return next(new Error('Need login'));
  }

  redis.connect();
  const getRefreshInRedis = await redis.get(refreshToken);
  redis.quit();

  if (!getRefreshInRedis) {
    return next(new Error('Need login'));
  }

  if (Number(verifiedRefreshToken.userId) !== Number(getRefreshInRedis)) {
    return next(new Error('Need login'));
  }

  const newAccessToken = jwt.sign(
    { id: verifiedRefreshToken.userId },
    process.env.SECRETTEXT,
    { expiresIn: '1h' }
  );
  res.locals.user = verifiedRefreshToken.userId;
  res.locals.accessToken = newAccessToken;
  next();
};

function verifyAccessToken(accessTokenToken) {
  try {
    return jwt.verify(accessTokenToken, process.env.SECRETTEXT);
  } catch (error) {
    return false;
  }
}

function verifyRefreshToken(refreshTokenToken) {
  try {
    return jwt.verify(refreshTokenToken, process.env.REFRESHSECRETTEXT);
  } catch (error) {
    return false;
  }
}
