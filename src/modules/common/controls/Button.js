import { Tooltip, withStyles } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';
import * as PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const StyledTooltip = withStyles({
  tooltip: {
    fontSize: '12px',
  },
})(Tooltip);

const PaddingMapper = {
  small: '8px',
  zero: '0px',
};

class Button extends PureComponent {
  enhancePadding = Component => {
    const { padding } = this.props;

    const paddingValue = PaddingMapper[padding] || padding;

    return withStyles({ root: { padding: paddingValue } })(Component);
  };

  render() {
    const {
      asIcon,
      children,
      style,
      disabledHandler,
      disableTimeout,
      onClick,
      padding,
      tooltip,
      tooltipEnterDelay,
      timeout,
      ...rest
    } = this.props;
    let Component = asIcon ? MuiIconButton : Button;

    if (padding) {
      Component = this.enhancePadding(Component);
    }

    const renderedButton = (
      <Component style={style} {...rest}>
        {children}
      </Component>
    );

    if (tooltip) {
      return (
        <StyledTooltip title={tooltip} enterDelay={tooltipEnterDelay} interactive>
          <span>{renderedButton}</span>
        </StyledTooltip>
      );
    }

    return renderedButton;
  }
}

Button.propTypes = {
  ...MuiButton.propTypes,
  asIcon: PropTypes.bool,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Object.keys(PaddingMapper))]),
  tooltip: PropTypes.string,
  tooltipEnterDelay: PropTypes.number,
  variant: PropTypes.oneOf([
    'contained',
    'extendedFab',
    'fab',
    'flat',
    'outlined',
    'text',
    'raised',
  ]),
};

Button.defaultProps = {
  asIcon: false,
  padding: null,
  tooltip: null,
  tooltipEnterDelay: 500,
  variant: 'contained',
};

export default Button;
