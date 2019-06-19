import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import * as PropTypes from 'prop-types';

export class AdminPageComponent extends PureComponent {
  render() {
    const { t } = this.props;

    return <div>{t('Admin.content')}</div>;
  }
}

AdminPageComponent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('translation')(AdminPageComponent);
