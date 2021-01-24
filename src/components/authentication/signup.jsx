import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import firebase from 'firebase';
import 'firebase/firestore';

const SubmitButton = styled.input`
  background-color: #84C0C9;
  color: white;
  text-align: center;
  width: 100%;
  justify-self: center;
  padding: 5px;
  margin-bottom: 10px;
  border: solid #84C0C9;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  width: 95%;
  border: solid #C4C4C4;
  border-radius: 5px;
`;

const StyledCol = styled(Col)`
  background-color: white;
  padding: 10px;
`;

const StyledRow = styled(Row)`
  padding: 10px;
`;

const StyledContainer = styled(Container)`
  background-color: #DCDCDC;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  padding: 10px;
`;

const ShowPassStyle = styled.div`
  display: flex;
`;

export default function SignUp() {
  const [name, setName] = React.useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showPass, togglePass] = useState('password');
  /* eslint-disable no-unused-vars */
  const [isAdmin, setIsAdmin] = React.useState(false);

  // eventually will need to be chnaged from alerts

  const validatePass = () => {
    if (password !== rePassword) {
      window.alert('Passwords must match');
    }
  };

  const validateEmail = () => {
    const emailFormat = /\S+@\S+\.\S+/;
    if (!emailFormat.test(email)) {
      window.alert('Please enter a valid email address');
    }
  };

  const validatePhone = () => {
    const phoneFormat = /[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phoneFormat.test(phone)) {
      window.alert('Please enter a valid phone number');
    }
  };

  const togglePassState = () => {
    if (showPass === 'password') {
      return 'text';
    }
    return 'password';
  };

  async function signupPress() {
    console.log('HERE');
    if (name.length > 1) {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
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

  const validateAll = () => {
    validateEmail();
    validatePhone();
    validatePass();
    signupPress();
  };

  return (
    <div className="m-3">
      <StyledContainer fluid>
        <StyledCol xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <StyledRow>
              <StyledCol xs={12} md={6}>
                <h2>Create an account</h2>
                <p>Name</p>
                <StyledInput type="text" placeholder="Sally Smith" onChange={(x) => setName(name.replace(name, x.target.value))} required />
              </StyledCol>
            </StyledRow>
            <StyledRow>
              <StyledCol xs={12} md={6}>
                <p>Email</p>
                <StyledInput type="text" placeholder="sallysmith@gmail.com" onBlur={() => validateEmail(email)} onChange={(x) => setEmail(email.replace(email, x.target.value))} required />
              </StyledCol>
              <StyledCol xs={12} md={6}>
                <p>Phone Number</p>
                <StyledInput type="text" placeholder="123-456-7890" onBlur={() => validatePhone(phone)} onChange={(x) => setPhone(phone.replace(phone, x.target.value))} required />
              </StyledCol>
            </StyledRow>
            <StyledRow>
              <StyledCol xs={12} md={6}>
                <p>Password</p>
                <StyledInput type={showPass} placeholder="******" onChange={(e) => setPassword(password.replace(password, e.target.value))} onBlur={(x) => validatePass(rePassword, x.target.value)} required />
              </StyledCol>
              <StyledCol xs={12} md={6}>
                <p>Re-enter Password</p>
                <StyledInput type={showPass} placeholder="******" onChange={(e) => setRePassword(rePassword.replace(rePassword, e.target.value))} onBlur={(x) => validatePass(password, x.target.value)} required />
              </StyledCol>
              <StyledCol>
                <ShowPassStyle>
                  <input type="checkbox" onChange={() => togglePass(showPass.replace(showPass, togglePassState(showPass)))} />
                  <p>Show Password</p>
                </ShowPassStyle>
                <SubmitButton type="submit" value="Create Account" onClick={validateAll} />
              </StyledCol>
            </StyledRow>
          </form>
        </StyledCol>
      </StyledContainer>
    </div>
  );
}
