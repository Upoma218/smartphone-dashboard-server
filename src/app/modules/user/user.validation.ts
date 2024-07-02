import { z } from 'zod';
import { passwordFormat } from './user.constant';

const userValidationSchema = z.object({
  userId: z.string(),
  email: z.string().email({
    message: 'Invalid Email format.',
  }),
  password: z.string().refine((value) => passwordFormat.test(value), {
    message:
      'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  }),
  role: z.string(),
});

export const UserValidation = {
  userValidationSchema,
};
