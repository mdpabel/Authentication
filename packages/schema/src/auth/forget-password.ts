import { z } from 'zod';

export const forgetPasswordSchema = z.object({
  email: z
    .string({
      message: 'Email must not be empty',
    })
    .email({ message: 'Invalid email address' }),
});

export type ForgetPassword = z.infer<typeof forgetPasswordSchema>;
