import { AppModules } from 'utils/constants';
import { Roles } from 'modules/common/security/roles';
import AdminPage from 'modules/admin/Admin.page';

const ADMIN_MODULE_PREFIX = '/admin';

export const AdminUrls = {
  Admin: `${ADMIN_MODULE_PREFIX}`,
};

export default [
  {
    route: AdminUrls.Admin,
    component: AdminPage,
    requiredModules: [AppModules.Admin],
    requiredRoles: Roles.OnlyAdmin,
  },
];
