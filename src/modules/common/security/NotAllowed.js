import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

export class NotAllowedComponent extends PureComponent {
  render() {
    const { textKey, t } = this.props;

    return <div>{t(textKey)}</div>;
  }
}

NotAllowedComponent.propTypes = {
  textKey: PropTypes.string,
  t: PropTypes.func.isRequired,
};

NotAllowedComponent.defaultProps = {
  textKey: 'Common.notAllowed',
};

export default withTranslation('translation')(NotAllowedComponent);
