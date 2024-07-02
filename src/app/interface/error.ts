export type TGenericErrorResponse = {
  success: boolean;
  message: string;
  errorMessage: string;
  errorDetails: object;
  stack: string;
};
