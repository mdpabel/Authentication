import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/auth';
// import { ROLE } from '@prisma/client';
import { RequestWithUser } from '../types/auth-types';
import { ACCESS_TOKEN_COOKIE_NAME } from '../constants';

export const authMiddlware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  try {
    const payload = await verifyToken(token, 'access');
    req.user = payload;
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  next();
};

export const roleMiddleware = (roles: ['ADMIN' | 'USER']) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !user.role || !roles.includes(user?.role)) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    next();
  };
};
