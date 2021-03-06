import React from 'react';
import { Route, Redirect } from "react-router-dom";

// COMPONENTS
import Menu from 'containers/menu/MenuContainer';

const AdminRoute = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  // if a "user" is stored and its status is 1, access to the road is allowed
  if (user && parseInt(user.status, 10) === 1) {
    return (
      <Route {...rest}>
        <Menu>
          <Component {...rest} />
        </Menu>
      </Route>
    )
  } else {
    return (
      <Redirect to={{ pathname: '/', state: { from: rest.location } }} />
    )
  }
}

export default AdminRoute;