import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
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

const retrieveDiscussions = async (dbRef) => {
  const discussions = [];
  const discussionsRef = dbRef.collection('discussions');
  const discussionsSnapshot = await discussionsRef.get();

  const discussionsIds = [];
  discussionsSnapshot.forEach(async (doc) => {
    const messages = [];

    const {
      dateCreated, name, pinned,
    } = doc.data();

    const msgRef = discussionsRef.doc(doc.id).collection('messages');
    const messageSnapshot = await msgRef.get();
    messageSnapshot.forEach((msg) => {
      const {
        message, timeSent, userRef,
      } = msg.data();

      messages.push({
        message,
        timeSent,
        userRef,
      });
    });

    discussions.push({
      id: doc.id,
      dateCreated,
      name,
      pinned,
      messages,
    });

    discussionsIds.push(doc.id);
  });

  return discussions;
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
        retrieveDiscussions(dbRef), // Gets discussions
      ]);
      const [user, users, vigils, discussions] = firestoreResponse;

      // Initialize redux store
      dispatch(actions.user.initializeUser(user));
      dispatch(actions.users.initializeUsers(users));
      dispatch(actions.vigils.initalizeVigils(vigils));
      dispatch(actions.discussions.initializeDiscussions(discussions));

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
