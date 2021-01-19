import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  const phoneFormat = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
  if (!phoneFormat.test(phone)) {
    window.alert('Please enter a valid phone number');
  }
};

export default function SignUp() {
  const [password, setPassword] = useState('');

  return (
    <div className="m-3">
      <h1>Create an account</h1>
      <Container>
        <form>
          <Row>
            <Col sm>
              <p>Name</p>
              <input type="text" placeholder="Sally Smith" />
            </Col>
          </Row>
          <Row>
            <Col sm>
              <p>Email</p>
              <input type="text" placeholder="sallysmith@gmail.com" onBlur={(e) => validateEmail(e.target.value)} />
            </Col>
            <Col sm>
              <p>Phone Number</p>
              <input type="text" placeholder="123-456-7890" onBlur={(e) => validatePhone(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Col sm>
              <p>Password</p>
              <input type="password" placeholder="******" onChange={(e) => setPassword(password.replace(password, e.target.value))} />
            </Col>
            <Col sm>
              <p>Re-enter Password</p>
              <input type="password" placeholder="******" onBlur={(e) => validatePass(password, e.target.value)} />
            </Col>
          </Row>
          <input type="button" />
        </form>
      </Container>
    </div>
  );
}
