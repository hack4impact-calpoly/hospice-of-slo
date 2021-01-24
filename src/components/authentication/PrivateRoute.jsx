import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';

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
  exact: propTypes.bool,
};

PrivateRoute.defaultProps = {
  exact: false,
};
