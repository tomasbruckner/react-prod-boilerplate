import React from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line no-restricted-imports
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from './muiTheme';
import theme from './theme';
import EnvironmentDuck from 'redux/ducks/environmentDuck';
import { AppTheme } from 'utils/constants';
import * as PropTypes from 'prop-types';

export const AppThemeComponent = ({ children, themeKey }) => {
  const styleKey = theme[themeKey] ? themeKey : AppTheme.default;

  return (
    <MuiThemeProvider theme={muiTheme[styleKey]}>
      <ThemeProvider theme={theme[styleKey]}>
        <>{children}</>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

AppThemeComponent.propTypes = {
  children: PropTypes.node.isRequired,
  themeKey: PropTypes.string,
};

AppThemeComponent.defaultProps = {
  themeKey: AppTheme.default,
};

const mapStateToProps = state => {
  return {
    themeKey: EnvironmentDuck.getSelectedTheme(state),
  };
};

export default connect(mapStateToProps)(AppThemeComponent);
