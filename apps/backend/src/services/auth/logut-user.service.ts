import { ErrorResponse } from '../../utils/custom-error';
import prisma from '../../utils/prisma';

export const logoutUserService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ErrorResponse('No refresh token provided', 400);
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (!storedToken) {
    throw new ErrorResponse('Invalid refresh token', 400);
  }

  await prisma.refreshToken.delete({
    where: {
      token: refreshToken,
    },
  });
};
