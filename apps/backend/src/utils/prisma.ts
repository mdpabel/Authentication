import { PrismaClient } from '@prisma/client';
import env from '../../env';

let prisma: PrismaClient;

let globalWithPrisma = global as typeof globalThis & {
  prisma: PrismaClient;
};

if (env.NODE_ENV !== 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
