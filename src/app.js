// import
import express from 'express';
import cookieParser from 'cookie-parser';
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';

// router import
import mainRouter from './routers/main.router.js';

const app = express();
const port = 3003;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.product = req.product;
  res.locals.accessToken = req.cookies.accessToken;
  res.locals.refreshToken = req.cookies.refreshToken;
  next();
});

// router middleware
app.use('/api', mainRouter);

app.use(ErrorHandlingMiddleware);
app.listen(port, () => {
  console.log(port, 'listening on port ' + port);
});
