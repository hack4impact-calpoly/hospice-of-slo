/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import './App.css';

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
      </Switch>
    </div>
  );
}
