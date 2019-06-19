import { AppModules } from 'utils/constants';
import UserPage from 'modules/user/Users.page';

const USER_MODULE_PREFIX = '/users';

export const UserUrls = {
  Users: `${USER_MODULE_PREFIX}`,
  UserDetail: `${USER_MODULE_PREFIX}/:userId`,
  UserCreate: `${USER_MODULE_PREFIX}/create`,
  UserEdit: `${USER_MODULE_PREFIX}/edit/:userId`,
};

export default [
  {
    route: UserUrls.Users,
    component: UserPage,
    requiredModules: [AppModules.User],
  },
];
