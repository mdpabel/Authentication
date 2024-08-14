import bcrypt from 'bcrypt';
import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import { RequestWithUser, UserPayload } from '../types/auth-types';
import {
  JWT_EMAIL_ACCESS_TOKEN_EXPIRES,
  JWT_EMAIL_refresh_TOKEN_EXPIRES,
  JWT_EMAIL_VERIFICATION_EXPIRES_IN,
} from '../constants';
import { ErrorResponse } from './custom-error';
import { TokenType } from '../types/jwt-token.type';
import env from '../../env';

export const hashPassword = async (plainTextPassword: string) => {
  try {
    const saltRounds = 8;
    const hashPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    if (hashPassword === undefined) {
      throw new Error('Hashing password failed');
    }

    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (
  encryptedPassword: string,
  plainTextPassword: string,
) => {
  try {
    return bcrypt.compare(plainTextPassword, encryptedPassword);
  } catch (error) {
    console.log(error);
  }
};

export const generateToken = async (payload: UserPayload, type: TokenType) => {
  const { expiresIn, secretKey } = getSecreteKeyAndExpiresIn(type);

  try {
    return jwt.sign(payload, secretKey, {
      expiresIn: expiresIn,
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (token: string, type: TokenType) => {
  const { secretKey } = getSecreteKeyAndExpiresIn(type);

  try {
    return jwt.verify(token, secretKey) as UserPayload;
  } catch (error: any) {
    console.log(error?.name);
    if (error instanceof TokenExpiredError) {
      throw new ErrorResponse('Token expired', 403);
    } else if (error instanceof JsonWebTokenError) {
      throw new ErrorResponse('Invalid token', 401);
    } else if (error instanceof NotBeforeError) {
      throw new ErrorResponse('Token not valid yet', 403);
    }
    throw new ErrorResponse('Unauthorized access', 401);
  }
};

export const decodeToken = async (token: string) => {
  return jwt.decode(token) as { id: number };
};

const getSecreteKeyAndExpiresIn = (type: TokenType) => {
  let secretKey: string;
  let expiresIn: string;

  switch (type) {
    case 'access':
      secretKey = env.JWT_ACCESS_SECRET;
      expiresIn = JWT_EMAIL_ACCESS_TOKEN_EXPIRES;
      break;
    case 'refresh':
      secretKey = env.JWT_REFRESS_SECRET;
      expiresIn = JWT_EMAIL_refresh_TOKEN_EXPIRES;
      break;
    case 'verification':
      secretKey = env.JWT_VERIFY_SECRET;
      expiresIn = JWT_EMAIL_VERIFICATION_EXPIRES_IN;
      break;

    default:
      throw new Error('Invalid token type');
  }

  return { secretKey, expiresIn };
};
