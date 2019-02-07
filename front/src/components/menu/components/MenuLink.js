import React from 'react';
import { Route, Link } from "react-router-dom";

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <div className={match ? "active" : ""}>
          <Link to={to}>{label}</Link>
        </div>
      )}
    />
  );
}

export default MenuLink;