export const passwordFormat =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{6,}$/;

  export const USER_ROLE = {
    superAdmin: 'superAdmin',
    manager: 'manager',
    seller: 'seller'
  } as const;
  