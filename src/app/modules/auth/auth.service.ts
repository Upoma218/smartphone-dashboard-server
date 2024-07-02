import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { TJwtPayload, createToken } from './auth.utils';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  // checking of user existance
  const user = await User.isUserExists(payload.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched');

  //create token and sent to the  client
  const jwtPayload: TJwtPayload = {
    userId: user.userId,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    jwtPayload,
    token,
  };
};

export const AuthService = {
  loginUser,
};
