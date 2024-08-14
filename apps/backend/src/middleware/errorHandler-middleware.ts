import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { ErrorResponse, handlePrismaError } from '../utils/custom-error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import env from '../../env';

type CallBack = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => Promise<void>;

export const requestBodyValidation = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsedSchema = schema.safeParse(req.body);

    if (!parsedSchema.success) {
      const errors = parsedSchema.error.errors;
      const parsedErrors: {
        [key: string]: string;
      } = {};

      errors.forEach((error) => {
        parsedErrors[error.path.toString()] = error.message;
      });

      return res.status(400).json({
        success: false,
        error: parsedErrors,
      });
    }
    next();
  };
};

export const errorHandleMiddleware = (callback: CallBack) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        const prismaError = handlePrismaError(error);
        res.status(prismaError.statusCode).json({
          success: false,
          message: prismaError.message,
        });
      } else if (error instanceof ErrorResponse) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
};

export const notFoundErrorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    message: 'Not found ' + req.url,
  });
};

export const catchErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({
    message: err.message,
    stack: env.NODE_ENV === 'development' && err.stack,
  });
};
