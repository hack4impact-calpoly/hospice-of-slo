import React, { useState } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)`
   background-color: #84C0C9;

`;

const StyledCol = styled(Col)`

   @media only screen and (min-width: 820px) {  
    background-color: #ECECEC;
    padding-bottom: 4%
  }

  ${'' /* If the width is greater than or equal to 820px, apply this styling */}


`;
const BackArrowLogo = () => (
  <div>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 16H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 7L5 16L14 25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');

  function checkPasswords() {
    if (password === reenterPassword) {
      window.alert('Success, password has been reset.');
    } else {
      window.alert('Password reset failed, passwords do not match.');
    }
  }

  return (
    <div className="m-5">
      <Container>
        <StyledCol md={{ span: 6, offset: 3 }}>
          <Row>
            <Col>
              <Link to="/login"><BackArrowLogo /></Link>
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 6, offset: 3 }}>
              <Form>
                <Form.Label>Reset Password</Form.Label>
                <Form.Group controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="reenterNewPassword">
                  <Form.Label>Re-enter new Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setReenterPassword(e.target.value)} />
                </Form.Group>
                <StyledButton onClick={checkPasswords} variant="primary" type="submit" block>
                  Confirm
                </StyledButton>
              </Form>
            </Col>
          </Row>
        </StyledCol>
      </Container>
    </div>
  );
}
