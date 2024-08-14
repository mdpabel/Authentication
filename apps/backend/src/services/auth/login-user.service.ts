import { Login } from '@packages/schema';
import { comparePassword, generateToken } from '../../utils/auth';
import { ErrorResponse } from '../../utils/custom-error';
import prisma from '../../utils/prisma';
import { tokenRotation } from '../../utils/token-rotation';

export const LoginService = async (
  LoginDto: Login & {
    exisitingRefreshToken: string;
  },
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: LoginDto.email,
    },
  });

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  const isPasswordVerified = await comparePassword(
    user.password,
    LoginDto.password,
  );

  if (!isPasswordVerified) {
    throw new ErrorResponse('Invalid credential', 400);
  }

  if (!user.isEmailVerified) {
    throw new ErrorResponse('Email not verified', 400);
  }

  if (!user.active) {
    throw new ErrorResponse('Account is deactivated by the admin', 403);
  }

  if (LoginDto.exisitingRefreshToken) {
    const { newAccessToken, newRefreshToken } = await tokenRotation(
      LoginDto.exisitingRefreshToken,
    );
    return { user, accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  const accessToken = await generateToken(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    'access',
  );

  const refreshToken = await generateToken(
    {
      id: user.id,
    },
    'refresh',
  );

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken!,
      expiresAt: expiryDate,
    },
  });

  return { user, accessToken, refreshToken };
};
