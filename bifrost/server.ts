import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import winston from 'winston';
import morgan from 'morgan';
import chalk from 'chalk';

import { morganMiddleware } from './src/logger/morgan-middleware';
import { logger } from './src/logger';
import { HttpException } from './src/utils/http/HttpException';
import { handleError } from './src/utils/http/handle-error';
import { decodeHeader } from './src/utils/http/handle-jwt-auth';

import { router as tokens } from './src/resources/tokens/tokens';
import { router as users } from './src/resources/users/users';

const router = express.Router();
const authenticatedRouter = express.Router();
const app = express();
const PORT = process.env.PORT || 8000;

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

authenticatedRouter.use(decodeHeader);
app.use(cookieParser());

app.use(morganMiddleware);
app.use(morgan('tiny', { stream: logger.stream }));

app.use('/tokens', authenticatedRouter.use(tokens));
app.use('/users', router.use(users));

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running on ${PORT}`);
});
