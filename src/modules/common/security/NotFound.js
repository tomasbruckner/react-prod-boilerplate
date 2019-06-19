import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

export class NotFoundComponent extends PureComponent {
  render() {
    const { textKey, t } = this.props;

    return <div>{t(textKey)}</div>;
  }
}

NotFoundComponent.propTypes = {
  textKey: PropTypes.string,
  t: PropTypes.func.isRequired,
};

NotFoundComponent.defaultProps = {
  textKey: 'Common.notFound',
};

export default withTranslation('translation')(NotFoundComponent);
