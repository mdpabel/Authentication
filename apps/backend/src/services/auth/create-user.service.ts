import { env } from 'process';
import { generateToken, hashPassword } from '../../utils/auth';
import prisma from '../../utils/prisma';
import { sendEmail } from '../../utils/email';
import { User } from '@packages/schema';
import { ErrorResponse } from '../../utils/custom-error';

export const createUserService = async (userData: User) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (existingUser && !existingUser.isEmailVerified) {
    throw new ErrorResponse(
      'User already exists but email is not verified. Please check your inbox for the verification link.',
      400,
    );
  }

  const encryptedPassword = (await hashPassword(userData.password)) as string;

  const user = await prisma.user.create({
    data: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: encryptedPassword,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      id: true,
    },
  });

  const token = await generateToken(
    {
      id: user.id,
    },
    'verification',
  );

  const name = user?.firstName + ' ' + user?.lastName;
  const link = `${env.FRONTEND_DOMAIN}/auth/verify-email?token=${token}`;

  await sendEmail({
    payload: {
      link,
      name,
    },
    subject: 'Account verification',
    to: user?.email,
    template: 'email-verification.handlebars',
  });

  return user;
};
