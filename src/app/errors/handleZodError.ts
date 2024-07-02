import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorDetails = err;
  const errorMessage = errorDetails.issues
    .map((detail) => `${detail.path} is required.`)
    .join(' ');

  return {
    success: false,
    message: 'Validation Error',
    errorMessage,
    errorDetails,
    stack: err.stack || '',
  };
};

export default handleZodError;
