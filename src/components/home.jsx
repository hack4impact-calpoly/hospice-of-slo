import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import actions from '../actions/index';

import HeaderWithNav from './navigation/nav-header';

const retrieveUser = async (dbRef) => {
  const currentUser = firebase.auth().currentUser.uid;
  const userRef = dbRef.collection('users').doc(currentUser);
  const temp = await userRef.get();
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

export default function Home() {
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
      console.log('Home: Initialize User store');
      dispatch(actions.user.initializeUser(user));

      console.log('Home: Initialize Users store');
      dispatch(actions.users.initializeUsers(users));

      console.log('Home: Initialize Vigils store');
      dispatch(actions.vigils.initalizeVigils(vigils));

      // navigation.navigate('Root');
    };

    initializeDatabase();
  }, []);

  return (
    <div>
      <HeaderWithNav>Home</HeaderWithNav>
    </div>
  );
}
