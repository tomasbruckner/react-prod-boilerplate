import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

export class HomePageComponent extends PureComponent {
  render() {
    const { t } = this.props;

    return <div>{t('Home.content')}</div>;
  }
}

HomePageComponent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('translation')(HomePageComponent);
