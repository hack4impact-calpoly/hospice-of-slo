import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

const SubmitButton = styled.input`
  background-color: #84C0C9;
  color: white;
  width: 25%;
  margin: 0 auto;
  padding: 5px;
  border: #84C0C9;
  border-radius: 5px;
`;

const MainStyle = styled.div`
  background-color: black;
`;

const InnerStyle = styled.div`
  background-color: white;
  border: solid black 2px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 200px;
  border-radius: 5px;
  border-color: #DCDCDC;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const validatePass = (pass, rePass) => {
  if (pass !== rePass) {
    window.alert('Passwords must match');
  }
};

const validateEmail = (email) => {
  const emailFormat = /\S+@\S+\.\S+/;
  if (!emailFormat.test(email)) {
    window.alert('Please enter a valid email address');
  }
};

const validatePhone = (phone) => {
  const phoneFormat = /[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  if (!phoneFormat.test(phone)) {
    window.alert('Please enter a valid phone number');
  }
};

export default function SignUp() {
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <MainStyle className="m-3">
      <InnerStyle>
        <h1>Create an account</h1>
        <Container>
          <form>
            <Row>
              <Col sm>
                <ColumnDiv>
                  <p>Name</p>
                  <StyledInput type="text" placeholder="Sally Smith" required />
                </ColumnDiv>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <p>Email</p>
                <StyledInput type="text" placeholder="sallysmith@gmail.com" onBlur={() => validateEmail(email)} onChange={(x) => setEmail(email.replace(email, x.target.value))} required />
              </Col>
              <Col sm>
                <p>Phone Number</p>
                <StyledInput type="text" placeholder="123-456-7890" onBlur={() => validatePhone(phone)} onChange={(x) => setPhone(phone.replace(phone, x.target.value))} required />
              </Col>
            </Row>
            <Row>
              <Col sm>
                <p>Password</p>
                <StyledInput type="password" placeholder="******" onChange={(e) => setPassword(password.replace(password, e.target.value))} required />
              </Col>
              <Col sm>
                <p>Re-enter Password</p>
                <StyledInput type="password" placeholder="******" onBlur={(e) => validatePass(password, e.target.value)} required />
              </Col>
            </Row>
            <SubmitButton type="submit" value="Create Account" />
          </form>
        </Container>
      </InnerStyle>
    </MainStyle>
  );
}
