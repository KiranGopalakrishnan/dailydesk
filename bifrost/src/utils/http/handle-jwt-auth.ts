import { HttpException } from './HttpException';
import { NextFunction, Request, Response } from 'express';
import { forbidden, unauthorized } from '../service-utils/Outcome';
import { verifyJWT } from '../jwt';
import { logger } from '../../logger';

export const decodeHeader = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token) {
    const { statusCode, message } = unauthorized('No authorization header found').getResponse();
    res.status(statusCode);
    return res.json({ error: message }).send();
  }
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
    if (!token || token === '') {
      const { statusCode, message } = unauthorized('No bearer token was provided').getResponse();
      res.status(statusCode);
      return res.json({ error: message }).send(message);
    }
  }

  // call the verifyJWT method to verify the token is valid
  const decoded = verifyJWT(token);
  if (!decoded) {
    const { statusCode, message } = forbidden('Invalid signature').getResponse();
    res.status(statusCode);
    return res.json({ error: message }).send();
  }
  // attach the decoded token to the res.user object
  if (decoded) (res as any).user = decoded;
  (res as any).token = token;
  return next();
};
