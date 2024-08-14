import { Request, Response } from 'express';
import { VerifyEmail } from '@packages/schema';
import { verifyEmailService } from '../../services/auth/verify-email.service';

export const verifyEmailController = async (req: Request, res: Response) => {
  const token = req.query as VerifyEmail;

  console.log(token);

  await verifyEmailService(token?.token);

  res.status(200).json({
    success: true,
    message: 'Email verified successfully',
  });
};
