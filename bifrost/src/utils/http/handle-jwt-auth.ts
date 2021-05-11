import { HttpException } from './HttpException';
import { NextFunction, Request, Response } from 'express';
import { forbidden, unauthorized } from '../service-utils/Outcome';
import { verifyJWT } from '../jwt';

export const decodeHeader = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['x-access-token'] || req.headers.authorization || req.body.token;
  if (!token) {
    return next(unauthorized());
  }
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
    if (!token || token === '') return next(unauthorized());
  }
  // call the verifyJWT method to verify the token is valid
  const decoded = verifyJWT(token);
  if (!decoded) next(forbidden('Invalid signature'));
  // attach the decoded token to the res.user object
  if (decoded) (res as any).user = decoded;
  (res as any).token = token;
  return next();
};
