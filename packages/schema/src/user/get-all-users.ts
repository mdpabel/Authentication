import { z } from 'zod';

export const getAlluserSchema = z.object({
  limit: z
    .number({
      message: 'Limit must be a positive integer',
    })
    .min(10, {
      message: 'Limit must be at least 10',
    })
    .default(10)
    .optional(),
  page: z
    .number({
      message: 'Offset must be a non-negative integer',
    })
    .min(0, {
      message: 'Offset must be at least 0',
    })
    .default(0)
    .optional(),
});

export type GetAllUser = z.infer<typeof getAlluserSchema>;
