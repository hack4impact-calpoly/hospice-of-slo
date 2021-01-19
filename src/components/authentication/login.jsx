import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

import logoImage from '../../images/HospiceLogo.png';

const SContainer = styled(Container)`
  display: flex;
  text-align:center;
  justify-content: center;
  box-sizing: border-box;
//  border: 1px solid green;
  height: 100vh;
  padding: 20vh 0;

  @media only screen and (min-width: 800px) {
    background-color: #ECECEC;
    padding: 10vh 10vw;
  }
`;

const StyledRow = styled(Row)`
  display: flex;
  margin:0;
  padding:0;
  box-sizing: border-box;
  text-align: center;
  justify-content: center;
//  border:1px solid red;
`;

const SCol = styled(Col)`
//  border: 1px solid blue;
  background-color: white;

  @media only screen and (min-width: 800px) {
    padding: 50px 6vw 80px 6vw;
    border-radius: 6px;
  }

`;

/* changes width of input fields */
const Credentials = styled(Form)`
  width: 100%;
`;

const SignIn = styled.button`
  border-radius: 5px;
  padding: 6px 0px; 
  width: 48%;
  font-family: Roboto;
  background-color: #84C0C9;
  color: white;
  border:none;

  &:hover{
    color: white;
    background-color: #558E97;
  }
`;

/* Create account */
const CreatLink = styled(Link)`
  text-decoration: none;
  color: #558E97;
  background-color: white;
  border: 2px solid #558E97; 
  border-radius: 5px;
  padding: 6px 0px; 
  width: 48%;
  font-family: Roboto;

  &:hover{
    text-decoration:none;
    color: white;
    background-color: #558E97;
  }
`;

const Buttons = styled(StyledRow)`
  justify-content: space-between;
`;

/* Forgot password */
const FLink = styled(Link)`
  display: flex;
  font-family: Roboto;
  margin-left: auto; 
  text-decoration: none;
  color: #6C6B6B;
  &:hover{
    text-decoration: none;
    color: black;
  }
`;

export default function Login() {
  return (
    <SContainer fluid>
      <StyledRow>
        <SCol md={7}>
          <Row>
            <Image src={logoImage} fluid />
          </Row>
          <StyledRow>
            <Credentials>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="password" />
              </Form.Group>
            </Credentials>
          </StyledRow>
          <Buttons>
            <CreatLink to="/signup">Create Account</CreatLink>
            <SignIn>Sign In</SignIn>
          </Buttons>
          <StyledRow>
            <FLink to="/forgot-password">Forgot Password?</FLink>
          </StyledRow>
        </SCol>
      </StyledRow>
    </SContainer>
  );
}
