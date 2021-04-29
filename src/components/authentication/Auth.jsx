/* eslint-disable */

// This is where the loading of our app occurs, redux, firebase, render frontend components, ...
import React, { useEffect, useState } from 'react';
import { ClassicSpinner } from 'react-spinners-kit';
import styled from 'styled-components';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import actions from '../../actions/index';

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const retrieveUser = async (dbRef) => {
  const currentUser = (sessionStorage.getItem('userid'));
  const userRef = dbRef.collection('users').doc(currentUser);
  const temp = await userRef.get();
  const ps = [];
  temp.data().prevShifts.forEach((shift) => {
    ps.push(shift);
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
      address, startTime, endTime, notes,
    } = doc.data();

    vigils.push({
      id: doc.id,
      address,
      startTime: startTime.toDate(),
      endTime: endTime.toDate(),
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
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeDatabase = async () => {
      const dbRef = await firebase.firestore();

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
      await dispatch(actions.user.initializeUser(user));
      await dispatch(actions.users.initializeUsers(users));
      await dispatch(actions.vigils.initalizeVigils(vigils));
      await dispatch(actions.discussions.initializeDiscussions(discussions));
      await dispatch(actions.history.initializeHistory(historyShifts));
    };

    const wraperFunc = async () => {
      await initializeDatabase().then(() => {
        setTimeout(() => {
          setPending(false);
        }, 1500);
      });
    };

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        sessionStorage.setItem('userid', user.uid);
        wraperFunc();
      } else {
        sessionStorage.clear();
      }
    });
  }, []);

  if (pending) {
    return (
      <LoaderContainer>
        <ClassicSpinner size={48} color="#60becc" />
      </LoaderContainer>
    );
  }

  return (
    <>{children}</>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
