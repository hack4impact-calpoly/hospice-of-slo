import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SignUp() {
  return (
    <div className="m-3">
      <h1>Create an account</h1>
      <Container>
        <form>
          <Row>
            <Col sm>
              <p>Name</p>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <input type="text" placeholder="Sally Smith" />
            </Col>
          </Row>
          <Row>
            <Col sm>
              <p>Email</p>
            </Col>
            <Col sm>
              <p>Phone Number</p>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <input type="text" placeholder="sallysmith@gmail.com" />
            </Col>
            <Col sm>
              <input type="text" placeholder="123-456-7890" />
            </Col>
          </Row>
          <Row>
            <Col sm>
              <p>Password</p>
            </Col>
            <Col sm>
              <p>Re-enter Password</p>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <input type="password" placeholder="******" />
            </Col>
            <Col sm>
              <input type="password" placeholder="******" />
            </Col>
          </Row>
          <input type="button" />
        </form>
      </Container>
    </div>
  );
}
