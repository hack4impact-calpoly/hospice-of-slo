import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import firebase from 'firebase';

const StyledDiv = styled.div`
  height: 100vh;
  background-color: #E2E2E2;
`;

const StyledContainer = styled(Container)`
  width: 100%;
  height: 100vh;
  @media only screen and (min-width: 768px) {
    height: 100vh;
    padding: 20vh 0;
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
`;

const StyledError = styled.div`
  color: red;
`;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  const forgotPassword = () => {
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(() => {
      console.log(`EMAIL SENT TO ${email}`);
      setShowStatus(true);
    }).catch((error) => {
      console.log(error);
      // More error cathching in to do
    });
  };

  return (
    <StyledDiv>
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol sm={12} md={8} lg={6} xl={5}>
            <Link to="/login">
              <BiArrowBack size="32" className="mb-4" />
            </Link>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Row>
                <Col md={12}>
                  <h3>Forgot Password</h3>
                  <p className="mt-4"> A reset link will be sent to your email </p>
                  <Form.Group className="mt-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  {showStatus
                    ? (
                      <StyledError>
                        <p className="mt-4">
                          {`Reset link sent to ${email}`}
                        </p>
                        <SubmitButton type="submit" onClick={forgotPassword}>
                          Reset Password
                        </SubmitButton>
                      </StyledError>
                    )
                    : (

                      <SubmitButton type="submit" onClick={forgotPassword}>
                        Reset Password
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
