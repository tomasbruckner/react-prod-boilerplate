import React from 'react';
import { NOT_ALLOWED, ROOT } from './urls';
import HomePage from 'modules/home/Home.page';
import NotAllowedPage from 'modules/common/pages/NotAllowed.page';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import { Redirect } from 'react-router';

export const getRoutes = () => {
  return [
    {
      route: ROOT,
      component: HomePage,
      exact: true,
    },
    {
      route: NOT_ALLOWED,
      component: NotAllowedPage,
    },
    ...userRoutes,
    ...adminRoutes,
    {
      route: '*',
      component: <Redirect to={ROOT} />,
    },
  ];
};
