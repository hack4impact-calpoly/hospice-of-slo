import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({
  children, isLoggedIn, path, exact,
}) {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (isLoggedIn ? children : <Redirect to="/login" />)}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  exact: false,
};
