import { z } from 'zod';

export const verifyEmailSchema = z.object({
  token: z.string(),
});

export type VerifyEmail = z.infer<typeof verifyEmailSchema>;
