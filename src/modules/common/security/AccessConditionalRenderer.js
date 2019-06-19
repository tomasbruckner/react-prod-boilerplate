import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserDuck from 'modules/user/duck/UserDuck';

class AccessConditionalRenderer extends PureComponent {
  hasAccess = () => {
    const { expectedRole, userRoles } = this.props;

    return userRoles.contains(expectedRole);
  };

  render() {
    const { renderIfAllowed, renderIfNotAllowed } = this.props;

    return this.hasAccess() ? renderIfAllowed() : renderIfNotAllowed();
  }
}

AccessConditionalRenderer.propTypes = {
  userRoles: PropTypes.arrayof(PropTypes.string).isRequired,
  expectedRole: PropTypes.string.isRequired,
  renderIfAllowed: PropTypes.func,
  renderIfNotAllowed: PropTypes.func,
};

AccessConditionalRenderer.defaultProps = {
  renderIfAllowed: () => null,
  renderIfNotAllowed: () => null,
};

const mapStateToProps = state => {
  return {
    userRoles: UserDuck.getUserRoles(state),
  };
};

export default connect(mapStateToProps)(AccessConditionalRenderer);
