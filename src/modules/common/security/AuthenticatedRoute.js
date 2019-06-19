import ErrorBoundary from 'modules/common/components/ErrorBoundary';
import { LOGIN, NOT_ALLOWED, ROOT } from 'modules/common/navigation/urls';
import UserDuck from 'modules/user/duck/userDuck';
import userProps from 'modules/user/duck/userProps';
import * as PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

class AuthenticatedRoute extends PureComponent {
  isNotAllowed = () => {
    // your logic
    return false;
  };

  isAllowed = () => {
    return true;
  };

  render() {
    const { isUserLogged, component: Component, allowedRoles, user, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          if (this.isAllowed()) {
            return (
              <ErrorBoundary>
                <Component {...props} />
              </ErrorBoundary>
            );
          }

          if (this.isNotAllowed()) {
            return <Redirect to={NOT_ALLOWED} />;
          }

          return <Redirect to={isUserLogged ? ROOT : LOGIN} />;
        }}
      />
    );
  }
}

AuthenticatedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  component: PropTypes.node.isRequired,
  isUserLogged: userProps.isUserLoggedProp.isRequired,
  user: userProps.userProp.isRequired,
};

AuthenticatedRoute.defaultProps = {
  allowedRoles: null,
};

const mapStateToProps = state => {
  return {
    isUserLoggedIn: UserDuck.isUserLoggedIn(state),
    user: UserDuck.getUser(state),
  };
};

export default connect(mapStateToProps)(AuthenticatedRoute);
