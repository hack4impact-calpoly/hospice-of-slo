/* eslint-disable no-unused-vars */ // TODO: Remove this in [DEV-6.5]
import React from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

export default function SignUp() {
  /* // These are mandatory vars useful when connecting DEV-6.5
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
  */

  function signupPress() {
    if (name.length > 1) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          user.user.updateProfile({
            displayName: name,
            // Function below will be needed once a users collection is added in firebase,
            // This function should make a user document in a user collection that stores
            // bonus features like phone, isAdmin, and name
          /* )}.then(() => { /
            const db = firebase.firestore();
            const userData = {
              email: user.email,
              name: user.displayName,
              phone: '',
              isAdmin: isAdmin,
            };

            const userRef = db.collection('users').doc(user.uid);
            userRef.set(userData);
            }); */
          }).catch((error) => {
            console.log('Display name not set.'); // feedback should be put on frontend
            console.log(error);
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log('Error:', errorMessage); // feedback should be put on frontend
        });
    } else {
      alert('Please enter your name.');
    }
  }

  return (
    <div className="m-3">
      Sign Up Page
    </div>
  );
}
