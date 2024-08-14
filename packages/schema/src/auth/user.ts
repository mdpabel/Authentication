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

export const userSchema = z.object({
  firstName: z
    .string({
      message: 'First name must not be empty',
    })
    .min(2, 'First name must be at least 2 characters'),

  lastName: z
    .string({
      message: 'Last name must not be empty',
    })
    .min(2, 'Last name must be at least 2 characters'),

  email: z
    .string({
      message: 'Email must not be empty',
    })
    .email({
      message: 'Invalid email address',
    }),

  password: passwordSchema,
});

export type User = z.infer<typeof userSchema>;
