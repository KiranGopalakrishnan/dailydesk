import { NextFunction, Request, Response } from 'express';
import { createUser, User } from '../users/user-service';
import { userPostTransformer, validateUserPost } from '../users/user-post-transformer';
import { badRequest, ExpressContext, internalServerError } from '../../utils/service-utils/Outcome';

import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();

router.post('/verify', jsonParser, async (req: Request, res: Response, throwable: NextFunction) => {
  const userPost = req.body as User;
  const isPostValid = validateUserPost(userPost);
  if (!isPostValid) throwable(badRequest('Invalid arguments').getResponse());
  try {
    const outcome = await createUser(userPost);
    const context = new ExpressContext(res, throwable);
    outcome.withContext(context).transformOrThrow(userPostTransformer);
  } catch (e) {
    console.error(e);
    throwable(internalServerError().getResponse());
  }
});
module.exports = router;
