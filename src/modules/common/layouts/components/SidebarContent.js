import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import * as PropTypes from 'prop-types';

export class SidebarContentComponent extends PureComponent {
  render() {
    const { t } = this.props;

    return <div>{t('')}</div>;
  }
}

SidebarContentComponent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('translation')(SidebarContentComponent);
