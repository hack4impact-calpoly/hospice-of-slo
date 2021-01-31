import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
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

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showErr, setShowErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();

  // A custom hook that builds on useLocation to parse
  // the query string for you.
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  const oobCode = query.get('oobCode');

  const validatePass = () => {
    if (password !== rePassword) {
      setShowErr(true);
      setErrMessage('Passwords must match');
    } else if (password.length < 6) {
      setShowErr(true);
      setErrMessage('Password must be at least 6 letters');
    } else {
      setShowErr(false);
    }
  };

  function confirmPassword() {
    const auth = firebase.auth();
    if (!showErr) {
      auth.confirmPasswordReset(oobCode, password)
        .catch((error) => {
          console.log(`error: ${error}`);
        });
      alert('Your password has been successfully changed!');
      history.push('/');
    } else {
      setShowErr(true);
    }
  }
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
                  <h3>Reset Password</h3>
                  <Form.Group className="mt-4">
                    <Form.Label>New password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Re-enter new password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                      onBlur={(e) => validatePass(password, e.target.value)}
                      required
                    />
                  </Form.Group>
                  {showErr
                    ? (
                      <StyledError>
                        {errMessage}
                        <SubmitButton type="submit" onClick={confirmPassword}>
                          Create Account
                        </SubmitButton>
                      </StyledError>
                    )
                    : (
                      <SubmitButton type="submit" onClick={confirmPassword}>
                        Confirm
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
