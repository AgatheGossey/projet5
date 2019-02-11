import React from 'react';
import { Route, Redirect } from "react-router-dom";

// COMPONENTS
import Menu from 'containers/menu/MenuContainer';

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem('user')) {
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

export default PrivateRoute;