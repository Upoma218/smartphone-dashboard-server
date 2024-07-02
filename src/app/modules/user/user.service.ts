import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: IUser) => {
  
  if (await User.isUserExists(payload.userId)) {
    throw new Error('User Already Exists');
  }
  const result = await User.create(payload);

  return result;
};

export const Userservice = {
  createUserIntoDB,
};
