import { verifyToken } from '../../utils/auth';
import { ErrorResponse } from '../../utils/custom-error';
import prisma from '../../utils/prisma';

export const verifyEmailService = async (token: string) => {
  const payload = await verifyToken(token, 'verification');

  if (!payload) {
    throw new ErrorResponse('Bad Request: Invalid token format', 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (existingUser?.isEmailVerified) {
    throw new ErrorResponse('Email is already verified', 400);
  }

  const user = await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      isEmailVerified: true,
    },
  });

  return user;
};
