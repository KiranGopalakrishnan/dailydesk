import { UserResponse } from '../../resources/users/user-post-transformer';
import path from 'path';
import { JWTPayload, User } from '../../resources/users/user-service';
import { getExistingRefreshToken } from '../../resources/tokens/token-service';
import { Company } from '../../resources/companies/company-service';

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

export interface DecodedToken<T> {
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
  payload: T;
}

const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

export const signJWT = (payload: JWTPayload, expiresIn: string = '15m'): string => {
  const signOptions = {
    issuer,
    subject,
    audience,
    expiresIn,
    algorithm: 'RS256',
  };

  return jwt.sign({ payload }, privateKEY, signOptions);
};

export const generateRefreshToken = (payload: Partial<User>) => signJWT(payload, '60d');

export const verifyJWT = <T>(token: string) => {
  return jwt.verify(token, publicKEY, verifyOptions) as { payload: T };
};

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (passwordToCompare: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(passwordToCompare, hashedPassword);
};

export const generateTokens = async (user: User, company: Company): Promise<Tokens> => {
  const { id, firstname, lastname, companyId, email, status } = user;
  const token = signJWT({ id, firstname, lastname, company, email, status });
  const refresh_token = generateRefreshToken({ id });
  return { token, refresh_token };
};
