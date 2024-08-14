import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(
    /[$!@%&]/,
    'Password must contain at least one special character ($, !, @, %, &)',
  )
  .refine(
    (val) => !/^\s|\s$/.test(val),
    'Password must not have leading or trailing whitespace',
  );

export const loginSchema = z.object({
  email: z
    .string({
      message: 'Email must not be empty',
    })
    .email({ message: 'Invalid email address' }),

  password: passwordSchema,
});

export type Login = z.infer<typeof loginSchema>;
