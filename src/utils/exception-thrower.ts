import { HttpException, HttpStatus } from '@nestjs/common';

// TODO: 502
const errors = {
  401: (errorMessage?: string) =>
    new HttpException(errorMessage, HttpStatus.UNAUTHORIZED),
};

export const throwError = (statusCode: number, errorMessage?: string) => {
  throw errors[statusCode](errorMessage);
};
