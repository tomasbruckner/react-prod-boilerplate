import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Logger, { loggerProp } from 'utils/logger';

export class ErrorBoundaryComponent extends PureComponent {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    const { logger } = this.props;
    logger.error(error, errorInfo);
  }

  render() {
    const { children, renderProp, t } = this.props;
    const { error } = this.state;

    if (!error) {
      return children;
    }

    if (renderProp) {
      return renderProp();
    }

    return <div>{t('CommonComponents.ErrorBoundary.error')}</div>;
  }
}

ErrorBoundaryComponent.propTypes = {
  children: PropTypes.node,
  logger: loggerProp,
  renderProp: PropTypes.func,
  t: PropTypes.func.isRequired,
};

ErrorBoundaryComponent.defaultProps = {
  children: null,
  logger: Logger,
  renderProp: null,
};

export default withTranslation('translations')(ErrorBoundaryComponent);
