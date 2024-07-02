import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from '../user/user.validation';
import { UserControler } from '../user/user.controller';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  UserControler.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoute = router;
