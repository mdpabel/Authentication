import { env } from 'process';
import { decodeToken, generateToken } from '../../utils/auth';
import { ErrorResponse } from '../../utils/custom-error';
import prisma from '../../utils/prisma';
import { sendEmail } from '../../utils/email';
import { ResendEmailVerification } from '@packages/schema';

export const resendVerificationEmailService = async (
  resendEmailVerification: ResendEmailVerification,
) => {
  const { id } = await decodeToken(resendEmailVerification.token);

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  if (user.isEmailVerified) {
    throw new ErrorResponse('Email already verified', 400);
  }

  const token = await generateToken(
    {
      id: user.id,
    },
    'verification',
  );

  const name = user?.firstName + '' + user?.lastName;
  const link = `${env.FRONTEND_DOMAIN}/auth/verify-email?token=${token}`;

  await sendEmail({
    to: user.email,
    payload: {
      link,
      name,
    },
    subject: 'Email verification',
    template: 'email-verification.handlebars',
  });
};
