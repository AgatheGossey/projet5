import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from "react-router-dom";
import history from 'utils/history';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// COMPONENTS
import Home from 'containers/home/HomeContainer';
import User from 'containers/user/UserContainer';
import Budget from 'containers/budget/BudgetContainer';
import Parameters from 'components/parameters/Parameters';
import PrivateRoute from 'components/common/PrivateRoute';
import AdminRoute from 'components/common/AdminRoute';
import Modal from 'containers/modal/ModalContainer';
import NotFound from 'components/notfound/NotFound'; 

// THEME
import { lightTheme, darkTheme } from 'utils/theme';

// ACTIONS
import { toggleDarkTheme } from 'actions/theme-actions';

const App = (props) => {
  return (
    <MuiThemeProvider
      theme={ !props.isDarkThemeEnable ? lightTheme : darkTheme}
    >
      <CssBaseline />
      <Router history={ history }>
        <Switch>
          <Route 
            path="/login"
            component={ Home }
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
            isDarkThemeEnable={ props.isDarkThemeEnable }
            toggleDarkTheme={ props.toggleDarkTheme }
          />
          <AdminRoute
            exact
            path="/user"
            component={ User } 
          />
          <PrivateRoute path='*' exact={true} component={ NotFound } />
        </Switch>
      </Router>
      <Modal />
    </MuiThemeProvider>
  );

}

const mapStateToProps = (state) => {
  return {
    isDarkThemeEnable: state.theme.isDarkThemeEnable,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleDarkTheme: () => {
      dispatch(toggleDarkTheme());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);