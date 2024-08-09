import { AnyZodObject } from 'zod';

export const zodValidation = (
  schema: AnyZodObject,
  payload: Record<string, unknown>,
) => {
  const parsedSchema = schema.safeParse(payload);

  if (!parsedSchema.success) {
    const errors = parsedSchema.error.errors;
    const parsedErrors: {
      [key: string]: string;
    } = {};

    errors.forEach((error) => {
      parsedErrors[error.path.toString()] = error.message;
    });

    return { error: errors, success: !!parsedSchema.success, data: null };
  }

  return {
    success: !!parsedSchema.success,
    data: parsedSchema.data,
    error: null,
  };
};
