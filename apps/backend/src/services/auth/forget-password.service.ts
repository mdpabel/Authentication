import { ForgetPassword } from '@packages/schema';
import env from '../../../env';
import { generateToken } from '../../utils/auth';
import { ErrorResponse } from '../../utils/custom-error';
import { sendEmail } from '../../utils/email';
import prisma from '../../utils/prisma';

export const forgetPasswordService = async (
  forgetPasswordDto: ForgetPassword,
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: forgetPasswordDto.email,
    },
  });

  if (!user) {
    throw new ErrorResponse("User doesn't exist", 400);
  }

  const token = await generateToken(
    {
      id: user.id,
    },
    'access',
  );

  const name = user?.firstName + ' ' + user?.lastName;
  const link = `${env.FRONTEND_DOMAIN}/api/auth/reset-password?token=${token}`;

  await sendEmail({
    payload: {
      link,
      name,
    },
    subject: 'Password reset',
    template: 'reset-password.handlebars',
    to: user.email,
  });
};
