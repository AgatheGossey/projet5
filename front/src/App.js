import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// COMPONENTS
import Home from 'containers/home/HomeContainer';
import User from 'containers/user/UserContainer';
import Budget from 'containers/budget/BudgetContainer';
import Parameters from 'components/parameters/Parameters';
import PrivateRoute from 'components/common/PrivateRoute';
import AdminRoute from 'components/common/AdminRoute';

// THEME
import { lightTheme, darkTheme } from 'theme';

// create a history object for handle the browser history 
export const history = createBrowserHistory();

class App extends Component {
  state = {
    isDarkThemeEnable: false,
  }

  toggleDarkTheme = () => {
    this.setState((state) => ({ isDarkThemeEnable: !state.isDarkThemeEnable }));
  }

  render() {
    return (
      <MuiThemeProvider
        theme={!this.state.isDarkThemeEnable ? lightTheme : darkTheme}
      >
        <CssBaseline />
        <Router history={history}>
          <Switch>
            <Route 
              path="/login"
              component={Home}
            />
            <PrivateRoute
              exact
              path="/"
              component={ Budget } 
            />
            <PrivateRoute 
              exact
              path="/parametres"
              component={ Parameters }
              isDarkThemeEnable={ this.state.isDarkThemeEnable }
              toggleDarkTheme={ this.toggleDarkTheme }
            />
            <AdminRoute
              exact
              path="/user"
              component={ User } 
            />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;