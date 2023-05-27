// This is where the loading of our app occurs, redux, firebase, render frontend components, ...
import React, { useEffect, useState } from "react";
import { ClassicSpinner } from "react-spinners-kit";
import styled from "styled-components";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import actions from "../../actions/index";

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const retrieveUser = async (dbRef) => {
  const currentUser = sessionStorage.getItem("userid");
  const thisUserRef = dbRef.collection("users").doc(currentUser);
  const temp = await thisUserRef.get();
  const ps = [];
  let user = {};
  try {
    temp.data().prevShifts.forEach((shift) => {
      shift.get().then((doc) => {
        if (doc.data() !== undefined) {
          const { address, shiftEndTime, shiftStartTime, userRef } = doc.data();

          ps.push({
            id: doc.id,
            address,
            shiftEndTime,
            shiftStartTime,
            userRef,
          });
        }
      });
    });
    console.log("Had shifts");
  } catch {
    console.log("No shifts");
  }
  try {
    user = {
      id: currentUser,
      isAdmin: temp.data().isAdmin || false,
      prevShifts: ps,
      isValidated: temp.data().isValidated || false,
    };
  } catch {
    console.log("not logged in");
  }
  sessionStorage.setItem("user", JSON.stringify(user));
  return user;
};

function compare(a, b) {
  // sorts in alphabetical order
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

const retrieveUsers = async (dbRef) => {
  const users = [];
  const pendingUsers = [];
  const usersRef = dbRef.collection("users");
  const usersSnapshot = await usersRef.get();

  usersSnapshot.forEach((doc) => {
    const { email, name, phone, isAdmin, isValidated, accountStatus } =
      doc.data();
    if (accountStatus === "pending") {
      pendingUsers.push({
        id: doc.id,
        email,
        name,
        phone,
        accountStatus,
        isAdminAccount: isAdmin,

        isValidAccount: isValidated,
      });
    } else if (accountStatus !== "denied") {
      users.push({
        id: doc.id,
        email,
        name,
        phone,
        accountStatus,
        isAdminAccount: isAdmin,
        isValidAccount: isValidated,
      });
    }
  });
  users.sort(compare);
  pendingUsers.sort(compare);
  return pendingUsers.concat(users);
};

// const retrieveShifts = async (dbRef) => {
//   const shifts = [];
//   const shiftsRef = dbRef.collection("shifts");
//   const shiftsSnapshot = await shiftsRef.get();

//   shiftsSnapshot.forEach((doc) => {
//     const { startTime, endTime, firstName, lastName } = doc.data();
//     shifts.push({
//       id: doc.id,
//       startTime: startTime.toDate(),
//       endTime: endTime.toDate(),
//       firstName,
//       lastName,
//     });
//   });
//   return shifts;
// };

const retrieveDiscussions = async (dbRef) => {
  const discussions = [];
  const discussionsRef = dbRef.collection("discussions");
  const discussionsSnapshot = await discussionsRef.get();

  discussionsSnapshot.forEach(async (doc) => {
    const messages = [];

    const { dateCreated, name, pinned } = doc.data();

    const msgRef = discussionsRef.doc(doc.id).collection("messages");
    const messageSnapshot = await msgRef.get();
    messageSnapshot.forEach((msg) => {
      const { message, timeSent, userRef } = msg.data();

      messages.push({
        message,
        timeSent,
        userRef,
        messageId: msg.id,
      });
    });
    discussions.push({
      id: doc.id,
      dateCreated,
      name,
      pinned,
      messages,
    });
  });
  return discussions;
};

const retrieveHistoryShifts = async (dbRef) => {
  const historyShifts = [];
  const shiftsRef = dbRef.collection("shifts");
  const shiftsSnapshot = await shiftsRef.get();

  shiftsSnapshot.forEach(async (shift) => {
    const { startTime, endTime, firstName, lastName } = shift.data();
    // const userSnapshot = await userRef.get();

    try {
      const thisShift = {
        id: shift.id,
        startTime: startTime.toDate(),
        endTime: endTime.toDate(),
        firstName,
        lastName,
      };
      historyShifts.push(thisShift);
      console.log(thisShift);
    } catch (error) {
      console.log("Error getting document:", error);
    }
  });

  return historyShifts;
};

export default function AuthProvider({ children }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeDatabase = async () => {
      const dbRef = await firebase.firestore();

      // Retrieve firestore data in parallel
      const firestoreResponse = await Promise.all([
        retrieveUser(dbRef), // Gets current users prevShifts and isAdmin?
        retrieveUsers(dbRef), // Gets all users contact/account information
        retrieveDiscussions(dbRef), // Gets discussions
        retrieveHistoryShifts(dbRef),
      ]);
      const [user, users, discussions, historyShifts] = firestoreResponse;
      // Initialize redux store
      await dispatch(actions.user.initializeUser(user));
      await dispatch(actions.users.initializeUsers(users));
      await dispatch(actions.discussions.initializeDiscussions(discussions));
      await dispatch(actions.history.initializeHistory(historyShifts));
    };

    const wraperFunc = async () => {
      await initializeDatabase().then(() => {
        setTimeout(() => {
          setPending(false);
        }, 2000); // Allow frontend to render
      });
    };

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        setPending(true);
        sessionStorage.setItem("userid", user.uid);
        wraperFunc();
      } else {
        setPending(false);
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

  return <>{children}</>;
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
