import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import winston from 'winston';
import morgan from 'morgan';
import chalk from 'chalk';

import { morganMiddleware } from './src/logger/morgan-middleware';
import { logger } from './src/logger';
import { HttpException } from './src/utils/http/HttpException';
import { handleError } from './src/utils/http/handle-error';
import { decodeHeader, decodeRefreshToken } from './src/utils/http/handle-jwt-auth';

import { router as tokens } from './src/resources/tokens/tokens';
import { router as users, protectedRouter as me } from './src/resources/users/users';
import { router as auto } from './src/resources/auto/auto-login';

const router = express.Router();
const authenticatedRouter = express.Router();
const autoLoginRouter = express.Router();
const app = express();
const PORT = process.env.PORT || 8000;

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

authenticatedRouter.use(decodeHeader);
autoLoginRouter.use(decodeRefreshToken);
app.use(cookieParser());

app.use(morganMiddleware);
app.use(morgan('tiny', { stream: logger.stream }));

app.use('/tokens', authenticatedRouter.use(tokens));
app.use('/users', router.use(users));
app.use('/users', router.use(me));
app.use('/auto', autoLoginRouter.use(auto));

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running on ${PORT}`);
});
