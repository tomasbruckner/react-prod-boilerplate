import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

export class PageLoadingComponent extends PureComponent {
  render() {
    const { t } = this.props;

    return <div>{t('Common.loading')}</div>;
  }
}

PageLoadingComponent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('translation')(PageLoadingComponent);
