import { ResetPassword } from '@packages/schema';
import { hashPassword, verifyToken } from '../../utils/auth';
import { ErrorResponse } from '../../utils/custom-error';
import { sendEmail } from '../../utils/email';
import prisma from '../../utils/prisma';

export const resetPasswordService = async (
  resetPasswordDto: ResetPassword & {
    token: string;
  },
) => {
  console.log(resetPasswordDto);

  const payload = await verifyToken(resetPasswordDto.token, 'access');
  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!user) {
    throw new ErrorResponse('Invalid token or user not found', 400);
  }

  const hashedPassword = await hashPassword(resetPasswordDto.password);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  const name = user?.firstName + '' + user?.lastName;
  const link = ``;

  await sendEmail({
    payload: {
      link,
      name,
    },
    subject: 'Password has been changed',
    template: 'change-password.handlebars',
    to: user.email,
  });
};
