import { ErrorResponse } from '../../utils/custom-error';
import prisma from '../../utils/prisma';

export const deleteUserService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
};
