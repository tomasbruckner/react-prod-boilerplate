export const StaticRoles = {
  Admin: 1,
  User: 2,
};

export const Roles = {
  OnlyAdmin: [StaticRoles.Admin],
  Authenticated: [StaticRoles.Admin, StaticRoles.User],
};
