/* eslint-disable */
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
import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCCN2e172NquNBYm5UBLLL6XZoli-m71p4",
  authDomain: "hospice-of-slo.firebaseapp.com",
  projectId: "hospice-of-slo",
  storageBucket: "hospice-of-slo.appspot.com",
  messagingSenderId: "401275954298",
  appId: "1:401275954298:web:914dd44fb059dd435dc7c3",
  measurementId: "G-GGLJ2GTL46"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

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
