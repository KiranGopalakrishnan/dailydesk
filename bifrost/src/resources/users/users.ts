import { NextFunction, Request, Response } from 'express';
import { HttpException, HttpStatus } from '../../utils/http/HttpException';
import { authenticateUser, createUser, User } from './user-service';
import {
  userPostTransformer,
  UserResponse,
  validateUserLoginPost,
  validateUserPost,
} from './user-post-transformer';
import { badRequest, ExpressContext, internalServerError } from '../../utils/service-utils/Outcome';
import { logger } from '../../logger';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { signJWT, generateRefreshToken, verifyJWT } from '../../utils/jwt';

const express = require('express');
const router = express.Router();

const jsonParser = bodyParser.json();

interface TokenResponse {
  token: string;
  refresh_token: string;
}

router.post('/', jsonParser, async (req: Request, res: Response, throwable: NextFunction) => {
  const userPost = req.body as User;
  const isPostValid = validateUserPost(userPost);
  if (!isPostValid) throwable(badRequest('Invalid arguments').getResponse());
  try {
    const outcome = await createUser(userPost);
    const context = new ExpressContext(res, throwable);
    outcome.withContext(context).transformOrThrow();
  } catch (e) {
    console.error(e);
    throwable(internalServerError().getResponse());
  }
});

router.post('/login', jsonParser, async (req: Request, res: Response, throwable: NextFunction) => {
  const userPost = req.body as Pick<User, 'email' | 'password'>;
  const isPostValid = validateUserLoginPost(userPost);
  if (!isPostValid) throwable(badRequest('Invalid arguments').getResponse());
  try {
    const outcome = await authenticateUser(userPost);

    const context = new ExpressContext(res, throwable);
    outcome.withContext(context).transformOrThrow(undefined);
  } catch (e) {
    console.error(e);
    throwable(internalServerError().getResponse());
  }
});

export { router };
