import * as PropTypes from 'prop-types';

const Logger = {
  info(...args) {
    // eslint-disable-next-line no-console
    console.log(...args);
  },
  error(...args) {
    // eslint-disable-next-line no-console
    console.error(...args);
  },
};

export const loggerProp = PropTypes.shape({
  info: PropTypes.func,
  error: PropTypes.func,
});

export default Logger;
