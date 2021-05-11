import { NextFunction, Request, Response } from 'express';
import { logger } from './src/logger';
import { HttpException } from './src/utils/http/HttpException';
import { handleError } from './src/utils/http/handle-error';
import { decodeHeader } from './src/utils/http/handle-jwt-auth';

const tokens = require('./src/resources/tokens/tokens');
const users = require('./src/resources/users/users');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// create application/json parser

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/tokens', tokens);
app.use('/users', users);

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  decodeHeader(req, res, next);
});

app.listen(PORT, () => {
  logger.error(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
