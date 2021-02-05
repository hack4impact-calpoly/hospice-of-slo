import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import ShiftDetails from '../shiftDetails';
import HeaderWithNav from './header';

const StyledButton = styled.button`
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

export default function Schedule(props) {
  const { isAdmin } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <HeaderWithNav {...{ isAdmin }}>Schedule</HeaderWithNav>
      </div>

      <Button variant="primary" size="sm" onClick={handleShow}>Primary</Button>
      <Modal show={show} onEscapeKeyDown={handleClose} onHide={handleClose} centered>
        <Modal.Header closeButton>Shift Details</Modal.Header>
        <ShiftDetails isAdmin={isAdmin} address="100 Apple Drive" date="Tuesday 02/02/2021" time="8:00 AM to 12:00 PM" notes="lorem impsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum" />
        <Modal.Footer>
          <StyledButton onClick={() => window.alert('Successful sign up!')}>Sign Up</StyledButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

Schedule.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
