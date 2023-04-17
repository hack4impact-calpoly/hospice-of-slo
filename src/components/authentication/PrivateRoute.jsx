import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({
  children,
  path,
  exact,
  adminOnly,
  validatedOnly,
}) {
  const currentUser = sessionStorage.getItem("userid");

  const checkAccess = () => {
    if (currentUser === null) {
      return <Redirect to="/login" />;
    }
    if (validatedOnly) {
      if (!JSON.parse(sessionStorage.getItem("user")).isValidated) {
        return <Redirect to="/not-validated" />;
      }
      return children;
    }
    if (adminOnly) {
      if (!JSON.parse(sessionStorage.getItem("user")).isAdmin) {
        return <Redirect to="/discussion" />;
      }
      return children;
    }
    return children;
  };

  return <Route path={path} exact={exact} render={() => checkAccess()} />;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  adminOnly: PropTypes.bool,
  validatedOnly: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  exact: false,
  adminOnly: false,
  validatedOnly: false,
};
