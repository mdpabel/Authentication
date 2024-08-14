import { z } from 'zod';

export const updateUserSchema = z.object({
  firstName: z
    .string({
      message: 'First name must not be empty',
    })
    .min(2, 'First name must be at least 2 characters')
    .optional(),

  lastName: z
    .string({
      message: 'Last name must not be empty',
    })
    .min(2, 'Last name must be at least 2 characters')
    .optional(),

  password: z
    .string({
      message: 'Password must not be empty',
    })
    .min(8, 'Password must be at least 8 characters')
    .max(50)
    .optional(),

  businessName: z
    .string({
      message: 'Business name must not be empty',
    })
    .min(3, 'Business name must be at least 3 characters')
    .optional(),

  phoneNumber: z
    .string({
      message: 'Phone number must not be empty',
    })
    .regex(/^\+\d{1,15}$/, 'Invalid phone number format')
    .optional(),

  address: z
    .string({
      message: 'Address must not be empty',
    })
    .optional(),

  city: z
    .string({
      message: 'City must not be empty',
    })
    .optional(),

  country: z
    .string({
      message: 'Country must not be empty',
    })
    .optional(),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
