import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import RouterWrapper from 'modules/common/navigation/RouterWrapper';
import Notifications from 'modules/common/notifications/Notifications';
import AppTheme from 'themes/AppTheme';

const App = props => {
  return (
    <Provider store={store}>
      <AppTheme>
        <RouterWrapper {...props} />
        <Notifications />
      </AppTheme>
    </Provider>
  );
};

export default App;
