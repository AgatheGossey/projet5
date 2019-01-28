import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ba68c8',
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
      main: '#ba68c8',
    },
    secondary: {
      main: '#fff47c',
    },
  },
  typography: {
    useNextVariants: true,
  },
})