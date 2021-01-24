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
import Schedule from './components/pages/Schedule';
import Discussion from './components/pages/Discussion';
import PastShifts from './components/pages/PastShifts';
import Contacts from './components/pages/Contacts';
import History from './components/pages/History';
import PrivateRoute from './components/authentication/PrivateRoute';

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
        <PrivateRoute isLoggedIn={isUserLoggedIn()} path="/schedule"><Schedule /></PrivateRoute>
        <PrivateRoute isLoggedIn={isUserLoggedIn()} path="/discussion"><Discussion /></PrivateRoute>
        <PrivateRoute isLoggedIn={isUserLoggedIn()} path="/past-shifts"><PastShifts /></PrivateRoute>
        <PrivateRoute isLoggedIn={isUserLoggedIn()} path="/contacts"><Contacts /></PrivateRoute>
        <PrivateRoute isLoggedIn={isUserLoggedIn()} path="/history"><History /></PrivateRoute>
      </Switch>
    </div>
  );
}
