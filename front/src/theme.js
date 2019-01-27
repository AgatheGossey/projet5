import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3e2723',
    },
    secondary: {
      main: '#607d8b',
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
      main: '#ffd54f',
    },
    secondary: {
      main: '#ff7043',
    },
  },
  typography: {
    useNextVariants: true,
  },
})