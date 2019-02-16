import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#8c155a',
    },
    secondary: {
      main: '#1a237e',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fff47c',
    },
    secondary: {
      main: '#fff47c',
    },
  },
  typography: {
    useNextVariants: true,
  },
})