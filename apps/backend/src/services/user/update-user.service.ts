import { UpdateUser } from '@packages/schema';
import { ErrorResponse } from '../../utils/custom-error';
import prisma from '../../utils/prisma';

export const updateUserService = async (
  updateUserDto: UpdateUser,
  userId: number,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateUserDto,
  });

  return updatedUser;
};
