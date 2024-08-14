import { Request, Response } from 'express';
import { JWT_EMAIL_VERIFICATION_EXPIRES_IN } from '../../constants';
import { User } from '@packages/schema';
import { createUserService } from '../../services/auth/create-user.service';

export const createUserController = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body as User;

  const newUser = await createUserService({
    firstName,
    lastName,
    email,
    password,
  });

  res.status(201).json({
    data: newUser,
    success: true,
    message: `Account created successfully, A verification email has been sent. Please verify email within ${JWT_EMAIL_VERIFICATION_EXPIRES_IN} minutes`,
  });
};
