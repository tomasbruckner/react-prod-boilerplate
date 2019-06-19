import { createMuiTheme } from '@material-ui/core/styles';
import { AppTheme } from 'utils/constants';
import theme from './theme';

const DEFAULT_THEME = {
  ...createMuiTheme({
    palette: {
      primary: {
        light: theme[AppTheme.default].accent,
        main: theme[AppTheme.default].primary,
      },
      secondary: {
        main: theme[AppTheme.default].secondary,
      },
    },
    typography: {
      useNextVariants: true,
    },
  }),
  appTheme: theme[AppTheme.default],
};

export default {
  [AppTheme.default]: DEFAULT_THEME,
};
