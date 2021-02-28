import PropTypes from 'prop-types';
import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import actions from '../actions/index';

import HeaderWithNav from './navigation/nav-header';

const retrieveUsers = async (dbRef) => {
  const users = [];
  const usersRef = dbRef.collection('users');
  const usersSnapshot = await usersRef.get();

  usersSnapshot.forEach((doc) => {
    const {
      email, isAdmin, name, phone,
    } = doc.data();

    users.push({
      id: doc.id,
      email,
      isAdmin,
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
      notes, // Shifts Array
    });
  });
  return vigils;
};

export default function Home(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeDatabase = async () => {
      const dbRef = firebase.firestore();

      // Retrieve firestore data in parallel
      const firestoreResponse = await Promise.all([
        retrieveUsers(dbRef),
        retrieveVigils(dbRef),
      ]);
      const [users, vigils] = firestoreResponse;

      // Initialize redux store
      console.log('Home: Initialize Vigils store');
      dispatch(actions.vigils.initalizeVigils(vigils));

      console.log('Home: Initialize Users store');
      dispatch(actions.users.initializeUsers(users));
      // navigation.navigate('Root');
    };

    initializeDatabase();
  }, []);

  const { isAdmin } = props;
  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Home</HeaderWithNav>
    </div>
  );
}

Home.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
