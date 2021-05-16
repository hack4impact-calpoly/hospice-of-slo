import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Container, Row, Col, Form, Image,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import logoImage from '../../images/HospiceLogo.png';

const StyledDiv = styled.div`
  height: 100vh;
  background-color: #E2E2E2;
`;

const StyledContainer = styled(Container)`
  width: 100%;
  height: 100vh;
  @media only screen and (min-width: 768px) {
    height: 100vh;  
    padding: 10vh 0;
  }
`;

const StyledRow = styled(Row)`
  width: 100vw;
  height: 100%;
  text-align:center;
  justify-content: center;
`;

const StyledCol = styled(Col)`
  background-color: #FFFFFF;
  padding: 10%;
  @media only screen and (min-width: 768px) {
    border: 2px solid #C4C4C4;
    border-radius: 5px;
    padding: 5% 9%
  }
`;

const StyledImage = styled(Image)`
  position: relative;
  width: 100%;
`;

const SignIn = styled.button`
  color: white;
  background-color: #84C0C9;
  border: 2px solid #FFFFFF; 
  border-radius: 5px;
  padding: 6px 0px; 
  width: 100%;
  font-size: 14px;
  fontFamily: Roboto;

  &:hover{
    color: white;
    background-color: #558E97;
  }
`;

// Create account
const CreatLink = styled.button`
  color: #558E97;
  background-color: white;
  border: 2px solid #558E97; 
  border-radius: 5px;
  padding: 6px 0px; 
  width: 100%;
  font-size: 14px;
  fontFamily: Roboto;

  &:hover{
    text-decoration:none;
    color: white;
    background-color: #558E97;
  }
`;

const FLink = styled(Link)`
  position: relative;
  float: right;
  font-size: 14px;
  fontFamily: Roboto;
  color: #6C6B6B;
  &:hover{
    text-decoration: none;
    color: black;
  }
`;

const StyledError = styled.div`
  color: red;
`;

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  /* eslint-disable-next-line */
  const [password, setPassword] = React.useState('');
  const [showErr, setShowErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const loginPress = () => {
    // sign in to firebase with email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // signed in
        const currentUser = firebase.auth().currentUser.uid;
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(currentUser);
        userRef.get().then((user) => {
          if (user.exists) {
            history.push('/');
          } else {
            // user.data() will be undefined in this case
            setErrMessage('Cannot Find User');
            setShowErr(true);
          }
        }).catch((error) => {
          // console.error('Error getting user', error);
          setErrMessage(error);
          setShowErr(true);
        });
      })
      .catch(() => {
        // unable to sign in
        setErrMessage('Email account or password is incorrect');
        setShowErr(true);
      });
  };

  return (
    <StyledDiv>
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol sm={12} md={8} lg={6} xl={5}>
            <StyledImage src={logoImage} className="mt-4" />
            <Form.Control
              className="mt-3"
              type="email"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setShowErr(false);
              }}
            />
            <Form.Control
              className="mt-3 mb-3"
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setShowErr(false);
              }}
            />
            {showErr
              ? <StyledError>{errMessage}</StyledError>
              : (null)}
            <Row>
              <Col>
                <Link to="/signup">
                  <CreatLink>Create Account</CreatLink>
                </Link>
              </Col>
              <Col>
                <SignIn onClick={loginPress}>
                  Sign In
                </SignIn>
              </Col>
            </Row>
            <FLink className="mt-2" to="/forgot-password">Forgot Password?</FLink>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    </StyledDiv>
  );
}
