import { z } from 'zod';

export const resendEmailVerificationSchema = z.object({
  token: z.string(),
});

export type ResendEmailVerification = z.infer<
  typeof resendEmailVerificationSchema
>;
