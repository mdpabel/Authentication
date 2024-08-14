import { Request, Response } from 'express';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { REFRESH_TOKEN_COOKIE_NAME } from '../../constants';
import { ApiResponse, AuthResponse, Login } from '@packages/schema';
import { LoginService } from '../../services/auth/login-user.service';

const generateMaxAge = (token: string) => {
  const decodedToken = jwtDecode<JwtPayload>(token);
  const maxAge = decodedToken?.exp! * 1000 - Date.now();
  return maxAge;
};

export const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body as Login;
  const exisitingRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

  const { user, accessToken, refreshToken } = await LoginService({
    email,
    password,
    exisitingRefreshToken,
  });

  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    maxAge: generateMaxAge(refreshToken!),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  const decodedToken = jwtDecode(accessToken!);

  const response: ApiResponse<AuthResponse> = {
    success: true,
    data: {
      expiresAt: decodedToken.exp,
      token: accessToken,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
      },
    },
    message: 'Login successful',
  };

  res.status(200).json(response);
};
