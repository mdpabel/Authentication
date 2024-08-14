import { Request, Response } from 'express';
import { ResetPassword } from '@packages/schema';
import { resetPasswordService } from '../../services/auth/reset-password.service';

export const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body as ResetPassword;
  const token = req.query.token as string;

  await resetPasswordService({
    password,
    token,
  });

  res.status(201).json({
    success: true,
    message: 'successfully updated password',
  });
};
