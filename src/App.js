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
import Contacts from "./components/pages/contacts/Contacts";
import PrivateRoute from "./components/authentication/PrivateRoute";
import AuthProvider from "./components/authentication/Auth";
import DiscussionThread from "./components/pages/discussion/DiscussionThread";

import UserValid from "./components/pages/userValid/Valid";
import NewCalendar from "./components/pages/schedule/calendar/newCalendar";
import NotValidated from "./components/authentication/notValidated";

// OLD SETUP
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCCN2e172NquNBYm5UBLLL6XZoli-m71p4",
//   authDomain: "hospice-of-slo.firebaseapp.com",
//   projectId: "hospice-of-slo",
//   storageBucket: "hospice-of-slo.appspot.com",
//   messagingSenderId: "401275954298",
//   appId: "1:401275954298:web:914dd44fb059dd435dc7c3",
//   measurementId: "G-GGLJ2GTL46",
// };

/* const firebaseConfig = {
  apiKey: "AIzaSyBa_8hdahjwEa5kwUgrmpXnbHeOwT2_7JE",
  authDomain: "hospiceslotestspace.firebaseapp.com",
  projectId: "hospiceslotestspace",
  storageBucket: "hospiceslotestspace.appspot.com",
  messagingSenderId: "639582598022",
  appId: "1:639582598022:web:76d43bd18275e1a22e7207",
  measurementId: "G-8ZV7CCDGER",
};
 */

const firebaseConfig = {
  apiKey: "AIzaSyCWhIDmm4AahY-ps6A--6bbJTr2Kgu1g08",
  authDomain: "hospiceslo.firebaseapp.com",
  projectId: "hospiceslo",
  storageBucket: "hospiceslo.appspot.com",
  messagingSenderId: "328233334123",
  appId: "1:328233334123:web:e8dcdfc566d996d82ec82e",
  measurementId: "G-GTSL007CDL",
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
          <PrivateRoute validatedOnly path="/schedule">
            <NewCalendar />
          </PrivateRoute>
          <PrivateRoute validatedOnly path="/discussion/:id">
            <DiscussionThread />
          </PrivateRoute>
          <PrivateRoute validatedOnly path="/discussion">
            <Discussion />
          </PrivateRoute>
          <PrivateRoute validatedOnly path="/contacts">
            <Contacts />
          </PrivateRoute>
          <PrivateRoute validatedOnly adminOnly path="/userValid">
            <UserValid />
          </PrivateRoute>
          <Route path="/not-validated">
            <NotValidated />
          </Route>
          <Route render={() => <Redirect to="/discussion" />} />
        </Switch>
      </AuthProvider>
    </div>
  );
}
