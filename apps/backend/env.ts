import dotenv from 'dotenv';
dotenv.config();
import { z } from 'zod';

const schema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production']),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESS_SECRET: z.string(),
  JWT_VERIFY_SECRET: z.string(),
  NODE_MAILER_EMAIL: z.string(),
  NODE_MAILER_PASSWORD: z.string(),
  SENDER_EMAIL: z.string(),
  FRONTEND_DOMAIN: z.string(),
});

const result = schema.safeParse(process.env);

if (!result.success) {
  console.log(result.error);
  process.exit(1);
}

export default result.data;
