import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import actions from '../../actions/index';

const retrieveUser = async (dbRef) => {
  const currentUser = (sessionStorage.getItem('userid'));
  console.log(currentUser);
  const userRef = dbRef.collection('users').doc(currentUser);
  console.log(userRef);
  const temp = await userRef.get();
  console.log('get it: ', temp.data());
  const ps = [];
  temp.data().prevShifts.forEach((shift) => {
    ps.push(shift.path);
  });

  const user = {
    id: currentUser,
    isAdmin: temp.data().isAdmin,
    prevShifts: ps,
  };
  console.log(user);
  sessionStorage.setItem('user', JSON.stringify(user));
  console.log(sessionStorage.getItem('user'));
  return user;
};

const retrieveUsers = async (dbRef) => {
  const users = [];
  const usersRef = dbRef.collection('users');
  const usersSnapshot = await usersRef.get();

  usersSnapshot.forEach((doc) => {
    const {
      email, name, phone,
    } = doc.data();

    users.push({
      id: doc.id,
      email,
      name,
      phone,
    });
  });
  return users;
};

const retrieveVigils = async (dbRef) => {
  const vigils = [];
  const vigilsRef = dbRef.collection('vigils');
  const vigilsSnapshot = await vigilsRef.get();

  vigilsSnapshot.forEach((doc) => {
    const {
      address, dates, startTime, endTime, notes,
    } = doc.data();

    vigils.push({
      id: doc.id,
      address,
      dates,
      startTime,
      endTime,
      notes, // TODO: Add Shifts Array
    });
  });
  return vigils;
};

export default function AuthProvider({ children }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeDatabase = async () => {
      const dbRef = firebase.firestore();

      // Retrieve firestore data in parallel
      const firestoreResponse = await Promise.all([
        retrieveUser(dbRef), // Gets current users prevShifts and isAdmin?
        retrieveUsers(dbRef), // Gets all users contact/account information
        retrieveVigils(dbRef),
      ]);
      const [user, users, vigils] = firestoreResponse;

      // Initialize redux store
      dispatch(actions.user.initializeUser(user));
      dispatch(actions.users.initializeUsers(users));
      dispatch(actions.vigils.initalizeVigils(vigils));

      // navigation.navigate('Root');
    };
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user: ', user);
      if (user != null) {
        sessionStorage.setItem('userid', user.uid);
        initializeDatabase();
      } else {
        sessionStorage.clear();
      }
      console.log(sessionStorage.getItem('user'));
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <>Loading...</>
    );
  }

  return (
    <>{children}</>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
