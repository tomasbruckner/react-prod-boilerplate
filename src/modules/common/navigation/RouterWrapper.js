import React, { PureComponent } from 'react';
import { Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { registerLogoutInterceptor, unregisterInterceptor } from 'utils/httpHandler';
import { getRoutes } from './routes';
import AuthenticatedRoute from 'modules/common/security/AuthenticatedRoute';

class RouterWrapper extends PureComponent {
  responseInterceptorId = null;

  componentDidMount() {
    this.responseInterceptorId = registerLogoutInterceptor(this.onLogout);
  }

  componentWillUnmount() {
    if (this.responseInterceptorId !== null) {
      unregisterInterceptor(this.responseInterceptorId);
    }
  }

  onLogout = () => {
    // handle logout
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {getRoutes().map(({ route, component, ...rest }) => {
            return <AuthenticatedRoute key={route} path={route} component={component} {...rest} />;
          })}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;
