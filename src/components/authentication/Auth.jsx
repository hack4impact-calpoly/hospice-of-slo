import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import actions from '../../actions/index';

const retrieveUser = async (dbRef) => {
  const currentUser = (sessionStorage.getItem('userid'));
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
  sessionStorage.setItem('user', JSON.stringify(user));
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

const retrieveHistoryShifts = async (dbRef) => {
  const historyShifts = [];
  const vigilsRef = dbRef.collection('vigils');
  const vigilsSnapshot = await vigilsRef.get();

  vigilsSnapshot.forEach(async (doc) => {
    const historyShiftsRef = vigilsRef.doc(doc.id).collection('shifts');
    const historyShiftsSnapshot = await historyShiftsRef.get();

    historyShiftsSnapshot.forEach(async (shift) => {
      const {
        address, shiftEndTime, shiftStartTime, userRef,
      } = shift.data();
      const userSnapshot = await userRef.get();

      const {
        name,
      } = userSnapshot.data();

      const thisShift = {
        id: doc.id,
        address,
        shiftEndTime,
        shiftStartTime,
        name,
      };
      historyShifts.push(thisShift);
    });
  });
  return historyShifts;
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
        retrieveDiscussions(dbRef), // Gets discussions
        retrieveHistoryShifts(dbRef),
      ]);
      const [user, users, vigils, discussions, historyShifts] = firestoreResponse;
      // Initialize redux store
      dispatch(actions.user.initializeUser(user));
      dispatch(actions.users.initializeUsers(users));
      dispatch(actions.vigils.initalizeVigils(vigils));
      dispatch(actions.discussions.initializeDiscussions(discussions));
      dispatch(actions.history.initializeHistory(historyShifts));

      // navigation.navigate('Root');
    };
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        sessionStorage.setItem('userid', user.uid);
        initializeDatabase();
      } else {
        sessionStorage.clear();
      }
      /*
        When u refresh the page (or it is initially loaded), this code waits 4 seconds
        to make sure that data is loaded in from firebase and put in the store.
        TODO: See [DEV-61] - fix this.
      */
      setTimeout(() => {
        setPending(false);
      }, 4000);
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
