import { NextFunction, Request, Response } from 'express';
import { userPostTransformer, validateUserPost } from '../users/user-post-transformer';
import { badRequest, ExpressContext, internalServerError } from '../../utils/service-utils/Outcome';

import bodyParser from 'body-parser';
import { refreshJwtToken, revokeTokenForId, verifyJwtToken } from './token-service';
import { logger } from '../../logger';
import { prisma } from '../../utils/db';
import { getUserById } from '../users/user-service';

const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();

router.get('/verify', jsonParser, async (req: Request, res: Response, throwable: NextFunction) => {
  const requestData = req.body as { token: string };
  if (!requestData) throwable(badRequest('No token was provided to verify').getResponse());
  try {
    const outcome = await verifyJwtToken(requestData.token);

    const context = new ExpressContext(res, throwable);
    outcome.withContext(context).transformOrThrow();
  } catch (e) {
    logger.error(e);
    throwable(internalServerError().getResponse());
  }
});

router.post(
  '/refresh',
  jsonParser,
  async (req: Request, res: Response, throwable: NextFunction) => {
    const data = req.body as { token: string };
    if (!data.token) throwable(badRequest('No refresh token was provided').getResponse());
    try {
      const outcome = await refreshJwtToken(data.token);
      const context = new ExpressContext(res, throwable);
      outcome.withContext(context).transformOrThrow();
    } catch (e) {
      logger.error(e);
      throwable(internalServerError().getResponse());
    }
  }
);

router.get(
  '/revoke/:id',
  jsonParser,
  async (req: Request, res: Response, throwable: NextFunction) => {
    const id = req.params.id;
    if (!id) throwable(badRequest('User id must be provided').getResponse());
    try {
      const outcome = await revokeTokenForId(id);
      const context = new ExpressContext(res, throwable);
      outcome.withContext(context).transformOrThrow();
    } catch (e) {
      logger.error(e);
      throwable(internalServerError().getResponse());
    }
  }
);
export { router };
