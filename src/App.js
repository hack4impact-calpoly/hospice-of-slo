/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './components/authentication/login';
import Signup from './components/authentication/signup';
import ForgotPassword from './components/authentication/forgotPassword';
import ResetPassword from './components/authentication/resetPassword';
import SuccessPage from './components/authentication/successPage';

export default function App() {
  function isUserLoggedIn() {
    return false;
  }
  return (
    <div className="main">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            isUserLoggedIn() ? (
              <Home />
            ) : (
              <Redirect to="/login" />
            )
          )}
        />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/success">
          <SuccessPage />
        </Route>
      </Switch>
    </div>
  );
}
