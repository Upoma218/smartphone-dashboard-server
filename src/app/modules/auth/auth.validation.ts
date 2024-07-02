import { z } from 'zod';

const loginValidationSchema = z.object({
  userId: z.string({ required_error: 'User Id is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});


export const AuthValidation = {
  loginValidationSchema,
};
