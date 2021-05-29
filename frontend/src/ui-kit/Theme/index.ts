import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from './colors';

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'none',
        height: '48px',
      },
      outlined: {
        border: `solid 1px ${colors.BLUE_1}`,
        textTransform: 'none',
        height: '48px',
        '&:hover': {
          backgroundColor: colors.BLUE_1,
        },
      },
    },
  },
  palette: {
    primary: {
      light: colors.GREY_5,
      main: colors.BLUE_1,
      dark: colors.BLUE_1,
      contrastText: colors.WHITE,
    },
    secondary: {
      light: colors.GREY_2,
      main: colors.MIDNIGHT_1,
      dark: colors.MIDNIGHT_5,
      contrastText: colors.BLACK,
    },
  },
  spacing: 8,
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Open Sans", sans-serif',
    allVariants: {
      color: colors.MIDNIGHT_3,
    },
    h1: {
      fontWeight: 500,
      fontSize: '2.5rem',
    },

    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },

    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },

    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },

    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },

    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    subtitle1: {
      fontWeight: 300,
      fontSize: '1rem',
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: '1rem',
    },
  },
});
