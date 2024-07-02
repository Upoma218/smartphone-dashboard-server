/* eslint-disable no-unused-vars */
import { Model} from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  userId: string;
  email: string;
  role: 'superAdmin'| 'manager'|'seller',
  password: string;
}

export interface UserModel extends Model<IUser> {
  isUserExists(userId: string): Promise<IUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;