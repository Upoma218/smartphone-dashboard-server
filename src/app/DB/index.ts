
import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superAdmin = {
  userId: 'superAdmin1',
  email: 'super.admin1@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
};

const seedSuperAdmin = async () => {

  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superAdmin);
  }
};

export default seedSuperAdmin;
