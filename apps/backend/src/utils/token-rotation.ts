import { generateToken, verifyToken } from './auth';
import { ErrorResponse } from './custom-error';
import prisma from './prisma';

const revokeAllToken = async (userId: number) => {
  await prisma.refreshToken.deleteMany({
    where: {
      userId,
    },
  });
};

export const tokenRotation = async (oldRefreshToken: string) => {
  if (!oldRefreshToken) {
    throw new ErrorResponse('No refresh token has provided', 400);
  }

  try {
    const decoded = await verifyToken(oldRefreshToken, 'refresh');

    if (!decoded) {
      throw new ErrorResponse('Invalid refresh token', 400);
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: {
        token: oldRefreshToken,
      },
      include: {
        User: true,
      },
    });

    if (!storedToken) {
      await revokeAllToken(decoded.id);
      throw new ErrorResponse('Invalid refresh token', 400);
    }

    const newAccessToken = await generateToken(
      {
        id: decoded.id,
        email: storedToken.User.email,
        firstName: storedToken.User.firstName,
        lastName: storedToken.User.lastName,
        role: storedToken.User.role,
      },
      'access',
    );

    const newRefreshToken = await generateToken(
      {
        id: decoded.id,
      },
      'refresh',
    );

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    await prisma.$transaction([
      prisma.refreshToken.delete({
        where: {
          token: oldRefreshToken,
        },
      }),
      prisma.refreshToken.create({
        data: {
          token: newRefreshToken!,
          userId: storedToken.userId,
          expiresAt: expiryDate,
        },
      }),
    ]);

    return {
      newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    console.error('Error during token rotation:', error);
    throw new ErrorResponse('Something went wrong', 500);
  }
};
