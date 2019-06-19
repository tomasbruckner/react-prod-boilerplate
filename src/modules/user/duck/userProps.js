import * as PropTypes from 'prop-types';

export default {
  userProp: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
  }),
  isUserLoggedProp: PropTypes.bool,
};
