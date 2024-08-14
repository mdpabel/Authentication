import { ROLE, User } from '@prisma/client';
import { Request } from 'express';

export type UserPayload = {
  id: number;
  email?: string;
  role?: ROLE;
  firstName?: string;
  lastName?: string;
};

export interface RequestWithUser extends Request {
  user?: UserPayload;
}
