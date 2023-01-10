// Root for entire app
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import firebase from "firebase/app";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import ForgotPassword from "./components/authentication/forgotPassword";
import ResetPassword from "./components/authentication/resetPassword";
import Discussion from "./components/pages/discussion/Discussion";
import PastShifts from "./components/pages/pastShifts/PastShifts";
import Contacts from "./components/pages/contacts/Contacts";
import History from "./components/pages/history/History";
import HistoryTable from "./components/pages/history/HistoryTable";
import PrivateRoute from "./components/authentication/PrivateRoute";
import AuthProvider from "./components/authentication/Auth";
import DiscussionThread from "./components/pages/discussion/DiscussionThread";
import ScheduleManager from "./components/pages/schedule/ScheduleManager";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCN2e172NquNBYm5UBLLL6XZoli-m71p4",
  authDomain: "hospice-of-slo.firebaseapp.com",
  projectId: "hospice-of-slo",
  storageBucket: "hospice-of-slo.appspot.com",
  messagingSenderId: "401275954298",
  appId: "1:401275954298:web:914dd44fb059dd435dc7c3",
  measurementId: "G-GGLJ2GTL46",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <div className="main">
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/">
            <Redirect to="/discussion" />
          </PrivateRoute>
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
          <PrivateRoute path="/schedule">
            <ScheduleManager />
          </PrivateRoute>
          <PrivateRoute path="/discussion/:id">
            <DiscussionThread />
          </PrivateRoute>
          <PrivateRoute path="/discussion">
            <Discussion />
          </PrivateRoute>
          <PrivateRoute path="/past-shifts">
            <PastShifts />
          </PrivateRoute>
          <PrivateRoute path="/contacts">
            <Contacts />
          </PrivateRoute>
          <PrivateRoute adminOnly path="/history/:id">
            <HistoryTable />
          </PrivateRoute>
          <PrivateRoute adminOnly path="/history">
            <History />
          </PrivateRoute>
          <Route render={() => <Redirect to="/discussion" />} />
        </Switch>
      </AuthProvider>
    </div>
  );
}
