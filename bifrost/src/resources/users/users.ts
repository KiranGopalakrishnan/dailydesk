import { NextFunction, Request, Response } from 'express';
import { HttpException, HttpStatus } from '../../utils/http/HttpException';
import { authenticateUser, createUser, getUser, logoutUser, User } from './user-service';
import {
  userPostTransformer,
  UserResponse,
  validateUserLoginPost,
  validateUserPost,
} from './user-post-transformer';
import {
  badRequest,
  ExpressContext,
  internalServerError,
  Outcome,
  success,
} from '../../utils/service-utils/Outcome';
import { logger } from '../../logger';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { signJWT, generateRefreshToken, verifyJWT, DecodedToken } from '../../utils/jwt';
import { COOKIE_KEYS } from '../../utils/http/cookies';
import { decodeHeader } from '../../utils/http/handle-jwt-auth';

const express = require('express');
const router = express.Router();
const protectedRouter = express.Router();
protectedRouter.use(decodeHeader);

const jsonParser = bodyParser.json();

interface TokenResponse {
  token: string;
  refresh_token: string;
}

protectedRouter.get(
  '/me',
  jsonParser,
  async (req: Request, res: Response, throwable: NextFunction) => {
    const decodedToken = (req as any).user as DecodedToken<User>;
    if (!decodedToken) throwable(internalServerError().getResponse());
    try {
      const outcome = await getUser(decodedToken.payload.id);
      const context = new ExpressContext(res, throwable);
      outcome.withContext(context).transformOrThrow();
    } catch (e) {
      console.error(e);
      throwable(internalServerError().getResponse());
    }
  }
);

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

protectedRouter.get(
  '/logout',
  jsonParser,
  async (req: Request, res: Response, throwable: NextFunction) => {
    try {
      const decodedUser = (req as any).user as User;
      const context = new ExpressContext(res, throwable);
      const outcome = await logoutUser(decodedUser.id);
      res.clearCookie(COOKIE_KEYS.JWT_TOKEN);
      res.clearCookie(COOKIE_KEYS.REFRESH_TOKEN);
      outcome.transformOrThrow(undefined);
    } catch (e) {
      console.error(e);
      throwable(internalServerError().getResponse());
    }
  }
);

export { router, protectedRouter };
