import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import {
  COOKIE_REFRESH_TOKEN_EXPIRES,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../constants';
import { refreshTokenService } from '../../services/auth/refresh-token.service';

export const refreshTokenController = async (req: Request, res: Response) => {
  const oldRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

  if (!oldRefreshToken) {
    res.status(401).json({
      success: false,
      message: 'No refresh token provided',
    });
    return;
  }

  const { newAccessToken, newRefreshToken } =
    await refreshTokenService(oldRefreshToken);

  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 0, // Delete the cookie immediately after use.
  });

  res.cookie(REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: COOKIE_REFRESH_TOKEN_EXPIRES, // 7 days
  });

  const decodedToken = jwtDecode(newAccessToken!);

  res.status(200).json({
    success: true,
    data: { accessToken: newAccessToken, expiresAt: decodedToken.exp },
  });
};
