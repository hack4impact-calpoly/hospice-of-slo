/* eslint-disable object-shorthand */
import React, { useState } from 'react';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { BiArrowBack } from 'react-icons/bi';

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
  text-align: left;
  justify-content: center;
`;

const StyledCol = styled(Col)`
  background-color: #FFFFFF;
  padding: 10%;
  @media only screen and (min-width: 768px) {
    border: 2px solid #C4C4C4;
    border-radius: 5px;
    padding: 5% 10%
  }
`;

const SubmitButton = styled.button`
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
  
  &:disabled{
    color: darkgrey;
    background-color: lightgrey;
  }
`;

const StyledError = styled.div`
  color: red;
`;

export default function SignUp() {
  const [name, setName] = React.useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showErr, setShowErr] = useState(false);
  const [noPassErrs, setNoPassErrs] = useState(false);
  const [noEmailErrs, setNoEmailErrs] = useState(false);
  const [noPhoneErrs, setNoPhoneErrs] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const history = useHistory();

  const validatePass = () => {
    if (password !== rePassword) {
      setShowErr(true);
      setErrMessage('Passwords must match');
    } else if (password.length < 6) {
      setShowErr(true);
      setErrMessage('Password must be at least 6 letters');
    } else {
      setShowErr(false);
      setNoPassErrs(true);
    }
  };

  const validateEmail = () => {
    const emailFormat = /\S+@\S+\.\S+/;
    if (!emailFormat.test(email)) {
      setShowErr(true);
      setNoEmailErrs(false);
      setErrMessage('Please enter a valid email address');
    } else {
      setShowErr(false);
      setNoEmailErrs(true);
    }
  };

  const validatePhone = () => {
    const myStr = phone.replace(/\D/g, ''); // strip all non numbers from phone number
    if (myStr.length < 7 || myStr.length >= 13) { // checks if phone has at least 7 nums
      setShowErr(true);
      setErrMessage('Please enter a valid phone number');
      setNoPhoneErrs(false);
    } else {
      setShowErr(false);
      setNoPhoneErrs(true);
    }
  };

  const logUserData = async (user) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(user.uid);
    const userData = {
      email: email,
      name: name,
      phone: phone,
      isAdmin: false,
      isValidated: false,
      prevShifts: [],
    };
    userRef.set(userData);
  };

  async function signupPress() {
    if (name.length > 1) {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.updateProfile({
            displayName: name,
          })
            .then(() => {
              logUserData(user.user) // creates a document for user with corresponding ID
                .then(() => {
                  history.push('/');
                });
            })
            .catch((error) => {
              setErrMessage(error.message);
              setShowErr(true);
            });
        })
        .catch((error) => {
          setErrMessage(error.message);
          setShowErr(true);
        });
    }
  }

  const validateAll = () => {
    validateEmail();
    validatePhone();
    validatePass();
    if (noPassErrs && noEmailErrs && noPhoneErrs) {
      signupPress();
      setShowErr(false);
    }
  };

  return (
    <StyledDiv>
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol sm={12} md={10} lg={8}>
            <Link to="/login">
              <BiArrowBack size="32" className="mb-4" />
            </Link>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Row>
                <Col md={12}>
                  <h3>Create an Account</h3>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mt-2">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      maxLength={50}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mt-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => validateEmail()}
                      required
                    />
                    <Form.Text className="text-muted">Note: This email can be seen to by other Hospice of San Luis Obispo doulas</Form.Text>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mt-2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => validatePhone()}
                      required
                    />
                    <Form.Text className="text-muted">Note: This phone number can be seen by other Hospice of San Luis Obispo doulas</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mt-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mt-2 mb-4">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                      onBlur={() => validatePass()}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {showErr
                    ? (
                      <StyledError>
                        {errMessage}
                        <SubmitButton type="submit" disabled onClick={validateAll}>
                          Create Account
                        </SubmitButton>
                      </StyledError>
                    )
                    : (
                      <SubmitButton type="submit" onClick={validateAll}>
                        Create Account
                      </SubmitButton>
                    )}
                </Col>
              </Row>
            </Form>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    </StyledDiv>
  );
}
