import { Request, Response } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from '../../constants';
import { logoutUserService } from '../../services/auth/logut-user.service';

export const logoutUserController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

  await logoutUserService(refreshToken);

  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
    maxAge: 0,
    httpOnly: true,
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
