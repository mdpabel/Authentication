import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, ErrorResponse);
  }
}

export const handlePrismaError = (err: PrismaClientKnownRequestError) => {
  switch (err.code) {
    case 'P2002':
      return new ErrorResponse(
        `Duplicate field value: ${err.meta?.target}`,
        400,
      );
    case 'P2014':
      return new ErrorResponse(`Invalid ID: ${err.meta?.target}`, 400);
    case 'P2003':
      return new ErrorResponse(`Invalid input data: ${err.meta?.target}`, 400);
    default:
      return new ErrorResponse(`Something went wrong: ${err.message}`, 500);
  }
};
