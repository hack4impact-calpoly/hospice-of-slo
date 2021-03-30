import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import firebase from 'firebase';
import Home from './components/home';
import Login from './components/authentication/login';
import Signup from './components/authentication/signup';
import ForgotPassword from './components/authentication/forgotPassword';
import ResetPassword from './components/authentication/resetPassword';
import SuccessPage from './components/authentication/successPage';
import Discussion from './components/pages/discussion/Discussion';
import PastShifts from './components/pages/pastShifts/PastShifts';
import Contacts from './components/pages/contacts/Contacts';
import History from './components/pages/history/History';
import PrivateRoute from './components/authentication/PrivateRoute';
import DiscussionThread from './components/pages/discussion/DiscussionThread';
import ScheduleManager from './components/pages/schedule/ScheduleManager';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCCN2e172NquNBYm5UBLLL6XZoli-m71p4',
  authDomain: 'hospice-of-slo.firebaseapp.com',
  projectId: 'hospice-of-slo',
  storageBucket: 'hospice-of-slo.appspot.com',
  messagingSenderId: '401275954298',
  appId: '1:401275954298:web:914dd44fb059dd435dc7c3',
  measurementId: 'G-GGLJ2GTL46',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <div className="main">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            isLoggedIn ? (
              <Home />
            ) : (
              <Redirect to="/login" />
            )
          )}
        />
        <Route path="/login">
          <Login toggleLoggedIn={toggleLoggedIn} setIsAdmin={setIsAdmin} />
        </Route>
        <Route path="/signup">
          <Signup toggleLoggedIn={toggleLoggedIn} />
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
        <PrivateRoute isLoggedIn={isLoggedIn} path="/schedule">
          <ScheduleManager />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} path="/discussion/:id">
          <DiscussionThread />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} path="/discussion">
          <Discussion />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} path="/past-shifts">
          <PastShifts />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isLoggedIn} path="/contacts">
          <Contacts />
        </PrivateRoute>
        <PrivateRoute isLoggedIn={isAdmin} path="/history">
          <History />
        </PrivateRoute>
      </Switch>
    </div>
  );
}
