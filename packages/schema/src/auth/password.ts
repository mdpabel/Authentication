import { z } from 'zod';

export const passwordSchema = z
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