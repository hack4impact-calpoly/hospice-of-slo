import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function SignUp() {
  return (
    <div className="m-3">
      Sign Up Page
      <h1>Create an account</h1>
      <Container>
        <form>
          <Row>
            <input type="text" />
          </Row>
          <Row>
            <input type="text" />
            <input type="text" />
          </Row>
          <Row>
            <input type="text" />
            <input type="text" />
          </Row>
        </form>
      </Container>
    </div>
  );
}
