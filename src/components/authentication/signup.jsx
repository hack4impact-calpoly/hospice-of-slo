/* eslint-disable */
import React from 'react';
import firebase from 'firebase';
import styled from 'styled-components';


export default function SignUp() {
  const [name, setName] = React.useState('Cole');
  const [email, setEmail] = React.useState('cperry10@calpoly.edu');
  const [password, setPassword] = React.useState('Cp1037702');
  const [validName, setValidName] = React.useState(true);
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);

  function signupPress() {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('errorCode: ', errorCode);
      console.log('errorMessage: ', errorMessage);
      // ..
    });
  }

  const StyledButtonExample = styled.button`
  background-color: #84C0C9;
  color: white;
  width: 10%;
  padding: 8px;
  border-radius: 6px;
  border: none;
`;

  return (
    <div className="m-3">
      Sign Up Page
      <StyledButtonExample className="ml-3" onClick={signupPress}>
        Log in
      </StyledButtonExample>
    </div>
  );
}
