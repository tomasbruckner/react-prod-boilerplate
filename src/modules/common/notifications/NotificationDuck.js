import * as PropTypes from 'prop-types';
import { createActionTypes } from 'redux/reduxUtils';

export const NotificationTypes = {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Info: 'info',
};

export const NotificationVariantPropType = PropTypes.oneOf(Object.values(NotificationTypes));

export const NotificationPropType = PropTypes.shape({
  message: PropTypes.string,
  variant: NotificationVariantPropType.isRequired,
});

const NotificationDuck = {
  name: 'NotificationDuck',
};

const initialState = {
  notification: null,
  lastNotification: null,
};

const actionTypes = createActionTypes(
  {
    removeNotification: 'removeNotification',
    setErrorNotification: 'setErrorNotification',
    setInfoNotification: 'setInfoNotification',
    setSuccessNotification: 'setSuccessNotification',
    setWarningNotification: 'setWarningNotification',
  },
  NotificationDuck.name,
);

const getNotification = (state, payload, variant) => {
  const { message } = payload;

  return {
    message,
    variant,
  };
};

NotificationDuck.reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.setErrorNotification: {
      const notification = getNotification(state, payload, NotificationTypes.Error);

      return {
        ...state,
        notification,
        lastNotification: notification,
      };
    }

    case actionTypes.setInfoNotification: {
      const notification = getNotification(state, payload, NotificationTypes.Info);

      return {
        ...state,
        notification,
        lastNotification: notification,
      };
    }

    case actionTypes.setSuccessNotification: {
      const notification = getNotification(state, payload, NotificationTypes.Success);

      return {
        ...state,
        notification,
        lastNotification: notification,
      };
    }

    case actionTypes.setWarningNotification: {
      const notification = getNotification(state, payload, NotificationTypes.Warning);

      return {
        ...state,
        notification,
        lastNotification: notification,
      };
    }

    case actionTypes.removeNotification: {
      return {
        ...state,
        notification: null,
      };
    }

    default:
      return state;
  }
};

NotificationDuck.setErrorNotification = message => ({
  type: actionTypes.setErrorNotification,
  payload: {
    message,
  },
});

NotificationDuck.setInfoNotification = message => ({
  type: actionTypes.setInfoNotification,
  payload: {
    message,
  },
});

NotificationDuck.setSuccessNotification = message => ({
  type: actionTypes.setSuccessNotification,
  payload: {
    message,
  },
});

NotificationDuck.setWarningNotification = message => ({
  type: actionTypes.setWarningNotification,
  payload: {
    message,
  },
});

NotificationDuck.removeNotification = () => ({
  type: actionTypes.removeNotification,
});

const getOwnState = state => {
  return state[NotificationDuck.name] || initialState;
};

NotificationDuck.getNotification = state => getOwnState(state).notification;
NotificationDuck.getLastNotification = state => getOwnState(state).lastNotification;

export default NotificationDuck;
