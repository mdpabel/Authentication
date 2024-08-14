import { ErrorResponse } from '../../utils/custom-error';
import prisma from '../../utils/prisma';

export const getProfileService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      isEmailVerified: true,
      role: true,
      provider: true,
      phoneNumber: true,
      address: true,
      city: true,
      active: true,
      businessName: true,
      country: true,
      avatar: true,
    },
  });

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  return user;
};
