/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = 404;
  let message = 'Something went wrong';
  let errorMessage = 'Error is occurred';

  let errorDetails = {};
  let stack = '';

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err?.name === 'ValidationError') {
    message = err.message;
  } else if (err?.name === 'CastError') {
    (message = 'Invalid ID'),
      (errorMessage = `${err.value} is not a valid ID!`),
      (errorDetails = err);
  } else if (err?.code === 11000) {
    message = err.message;
  } else if (err instanceof AppError) {
    message = err?.message;
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
