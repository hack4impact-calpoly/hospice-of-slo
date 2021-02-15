import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { BiX } from 'react-icons/bi';
import HeaderWithNav from '../navigation/nav-header';
// import ShiftDetails from './shiftDetails';
import Calendar from './mobileCalendar';
import ShiftSignUp from './ShiftSignUp';

const StyledButton = styled.button`
  color: white;
  background-color: #84C0C9;
  border: 2px solid #84C0C9;
  border-radius: 5px;
  width: 100%;
  padding: 6px 0px; 
  font-size: 14px;
  fontFamily: Roboto;
  

  &:hover{
    color: white;
    background-color: #558E97;
  }
`;

const StyledDiv = styled.div`
   position: relative;
   top: 0;
   left: 90%;
   width: 36px;
   cursor: pointer;
   padding: 1% 1%;
`;

const StyledCol = styled(Col)`
  padding: 5%;
`;

export default function Schedule(props) {
  const { isAdmin } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Schedule</HeaderWithNav>
      <Button variant="primary" size="sm" onClick={handleShow}>Shift Details</Button>
      <Modal show={show} onEscapeKeyDown={handleClose} onHide={handleClose} centered>
        <Modal.Body>
          <StyledDiv onClick={handleClose}>
            <BiX size="36" />
          </StyledDiv>
          <StyledCol>
            <ShiftSignUp isAdmin={isAdmin} address="100 Apple Drive" date="Tuesday 02/02/2021" time="8:00 AM to 12:00 PM" notes="lorem impsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum" />
            <Col className="mt-3">
              <StyledButton onClick={() => window.alert('Successful sign up!')}>Sign Up</StyledButton>
            </Col>
          </StyledCol>
        </Modal.Body>
      </Modal>
      <Calendar />
    </div>
  );
}

Schedule.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
