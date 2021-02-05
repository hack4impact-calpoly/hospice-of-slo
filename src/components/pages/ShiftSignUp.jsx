/* eslint-disable */
/* eslint-disable object-shorthand */
import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import firebase from 'firebase';
import 'firebase/firestore';
import { BiArrowBack } from 'react-icons/bi';
import Select from 'react-select';


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

export default function ShiftSignUp(props) {
  const {toggleLoggedIn} = props;
  /* eslint-disable no-unused-vars */
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = useState('');
  const [time1, setTime1] = useState('Select a time');
  
  const times = [
    {value:"8:00", label: "This would be the start of given shift"},
    {value:"8:10", label: "This would be the middle of given shift"},
    {value:"8:10", label: "This would be the middle of given shift"},
    {value:"8:10", label: "This would be the middle of given shift"},
    {value:"8:20", label: "This would be the end of given shift"}
  ]

  const checkSelect = () =>{
    console.log(time1);
  }

  return (
    <StyledDiv>
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol sm={12} md={10} lg={8}>
            <Link to="/shift">
              <BiArrowBack size="32" className="mb-4" />
            </Link>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Row>
                <Col md={12}>
                  <h3>Sign Up</h3>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mt-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="name"
                      value={name}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mt-2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="phone"
                      value={phone}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Select 
                    //value={time1}
                    onChange={(e) => setTime1(e.value)}
                    onBlur={checkSelect()}
                    options={times} 
                  />
                </Col>
                <Col sm={1}>
                  <p>to</p>
                </Col>
                <Col>
                  <Select 
                    onChange={(e) => setTime1(e.value)}
                    onBlur={checkSelect()}
                    options={times} 
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SubmitButton type="cancel">
                    Cancel
                  </SubmitButton>
                </Col>
                <Col>
                  <SubmitButton type="submit">
                    Sign Up
                  </SubmitButton>
                </Col>
              </Row>
            </Form>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    </StyledDiv>
  );
}

ShiftSignUp.propTypes = {
  toggleLoggedIn: PropTypes.func.isRequired,
};
