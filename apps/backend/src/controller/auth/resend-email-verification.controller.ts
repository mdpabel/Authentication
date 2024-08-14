import { Request, Response } from 'express';
import { JWT_EMAIL_VERIFICATION_EXPIRES_IN } from '../../constants';
import { ResendEmailVerification } from '@packages/schema';
import { resendVerificationEmailService } from '../../services/auth/resend-email-verification.service';

export const resendEmailVerificationContoller = async (
  req: Request,
  res: Response,
) => {
  const { token } = req.body as ResendEmailVerification;
  await resendVerificationEmailService({ token });

  res.status(201).json({
    success: true,
    message: `A new verification email has been sent. Please verify email within ${JWT_EMAIL_VERIFICATION_EXPIRES_IN} minutes`,
  });
};
