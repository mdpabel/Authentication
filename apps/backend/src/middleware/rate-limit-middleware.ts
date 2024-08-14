import { NextFunction, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';

export const rateLimitMiddlware = (windowMinute: number) => {
  return rateLimit({
    windowMs: windowMinute * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (req: Request, res: Response, next: NextFunction) => {
      console.log('origin: ' + req.headers.origin);

      res.status(429).json({
        success: false,
        message: `Too many requests. please try again after ${windowMinute} minutes`,
      });
    },
  });
};
