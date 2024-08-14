import { z } from 'zod';

export const resetPasswordSchema = z.object({
  password: z
    .string({
      message: 'Password must not be empty',
    })
    .min(8, 'Password must be at least 8 characters')
    .max(50),
});

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
