import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// COMPONENTS
import Home from 'containers/home/HomeContainer';
import Menu from 'containers/menu/MenuContainer';
import User from 'containers/user/UserContainer';
import Budget from 'containers/budget/BudgetContainer';
import Parameters from 'components/parameters/Parameters';

// THEME
import { lightTheme, darkTheme } from 'theme';

export const history = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem('token')) {
    return (
      <Route {...rest}>
        <Menu>
          <Component {...rest} />
        </Menu>
      </Route>
    )
  } else {
    return (
      <Redirect to={{ pathname: '/login', state: { from: rest.location } }} />
    )
  }
}

class App extends Component {
  state = {
    isDarkThemeEnable: false,
  }

  

  toggleDarkTheme = () => {
    this.setState((state) => ({ isDarkThemeEnable: !state.isDarkThemeEnable }));
  }

  render() {
    return (
      <MuiThemeProvider theme={!this.state.isDarkThemeEnable ? lightTheme : darkTheme}>
        <CssBaseline />
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Home} />
            <PrivateRoute exact path="/" component={ Budget }  />
            <PrivateRoute exact path="/parametres" component={ Parameters } isDarkThemeEnable={this.state.isDarkThemeEnable} toggleDarkTheme={this.toggleDarkTheme}/>
            <PrivateRoute exact path="/user" component={ User }  />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;