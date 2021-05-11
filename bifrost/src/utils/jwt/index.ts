import { UserResponse } from '../../resources/users/user-post-transformer';
import path from 'path';
import { User } from '../../resources/users/user-service';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'), 'utf8');
const publicKEY = fs.readFileSync(path.resolve(__dirname, './keys/jwtRS256.key.pub'), 'utf8');

const issuer = 'bifrost';
const subject = 'bifrost-token';
const audience = 'bifrost-users';

const verifyOptions = {
  issuer,
  subject,
  audience,
  expiresIn: '8784h',
  algorithm: ['RS256'],
};

export interface Tokens {
  token: string;
  refresh_token: string;
}

const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

export const signJWT = (payload: Partial<User>, expiresIn: string = '8784h'): string => {
  const signOptions = {
    issuer,
    subject,
    audience,
    expiresIn,
    algorithm: 'RS256',
  };

  return jwt.sign({ payload }, privateKEY, signOptions);
};

export const generateRefreshToken = (payload: Partial<User>) => signJWT(payload, '15m');

export const verifyJWT = (token: string) => {
  return jwt.verify(token, publicKEY, verifyOptions);
};

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (passwordToCompare: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(passwordToCompare, hashedPassword);
};

export const generateTokens = (user: Partial<User>): Tokens => {
  const { id, firstname, lastname, company, email, status } = user;
  const token = signJWT({ id, firstname, lastname, company, email, status });
  const refresh_token = generateRefreshToken({ id });
  return { token, refresh_token };
};
