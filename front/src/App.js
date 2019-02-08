import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// COMPONENTS
import Home from 'containers/home/HomeContainer';
import Menu from 'containers/menu/MenuContainer';
import Admin from 'containers/admin/AdminContainer';
import Budget from 'containers/budget/BudgetContainer';
import Parameters from 'components/parameters/Parameters';

// THEME
import { lightTheme, darkTheme } from 'theme';

const AppRoute = ({ component : Component, layout: Layout, ...rest }) => {
  return (
    <Route {...rest}>
      <Layout >
        <Component  {...rest} />
      </Layout>
    </Route>
  )
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
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
            <AppRoute exact path="/budget" layout={ Menu } component={ Budget }  />
            <AppRoute exact path="/parametres" layout={ Menu } component={ Parameters } isDarkThemeEnable={this.state.isDarkThemeEnable} toggleDarkTheme={this.toggleDarkTheme}/>
            <AppRoute exact path="/admin" layout={ Menu } component={ Admin }  />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;


