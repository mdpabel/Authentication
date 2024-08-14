import { GetAllUser } from '@packages/schema';
import prisma from '../../utils/prisma';

export const getAllUserService = async ({
  limit = 10,
  page = 1,
}: GetAllUser) => {
  return await prisma.user.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { id: 'asc' },
    select: {
      id: true,
      createdAt: true,
      email: true,
      firstName: true,
      lastName: true,
      isEmailVerified: true,
      provider: true,
      googleId: true,
      avatar: true,
      businessName: true,
      phoneNumber: true,
      address: true,
      city: true,
      country: true,
      role: true,
      active: true,
    },
  });
};
