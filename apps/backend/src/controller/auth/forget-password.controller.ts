import { Request, Response } from 'express';
import { JWT_EMAIL_ACCESS_TOKEN_EXPIRES } from '../../constants';
import { ForgetPassword } from '@packages/schema';
import { forgetPasswordService } from '../../services/auth/forget-password.service';

export const forgetPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body as ForgetPassword;
  await forgetPasswordService({ email });

  res.status(200).json({
    sucess: true,
    message: `A password reset link has been sent to ${email}. Please check your inbox within ${JWT_EMAIL_ACCESS_TOKEN_EXPIRES} minutes`,
  });
};
