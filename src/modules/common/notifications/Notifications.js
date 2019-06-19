import Snackbar from '@material-ui/core/Snackbar';

import NotificationDuck, {
  NotificationPropType,
} from 'modules/common/notifications/NotificationDuck';
import * as PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import NotificationContent from './components/NotificationContent';

const NOTIFICATION_TIMEOUT = 5000;

class Notifications extends PureComponent {
  notificationTimeoutId = null;

  componentDidUpdate() {
    const { notification, removeNotification } = this.props;

    if (notification) {
      clearTimeout(this.notificationTimeoutId);
      this.notificationTimeoutId = setTimeout(removeNotification, NOTIFICATION_TIMEOUT);
    }
  }

  render() {
    const { notification, lastNotification, removeNotification } = this.props;

    const { message, variant } = notification || lastNotification || {};

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={!!notification}
      >
        <NotificationContent onClose={removeNotification} variant={variant} message={message} />
      </Snackbar>
    );
  }
}

Notifications.propTypes = {
  notification: NotificationPropType,
  lastNotification: NotificationPropType,
  removeNotification: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  notification: null,
  lastNotification: null,
};

const mapStateToProps = state => {
  return {
    notification: NotificationDuck.getNotification(state),
    lastNotification: NotificationDuck.getLastNotification(state),
  };
};

const mapDispatchToProps = {
  removeNotification: NotificationDuck.removeNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
