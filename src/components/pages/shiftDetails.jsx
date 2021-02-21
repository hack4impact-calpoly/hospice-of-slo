/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { BiTrash, BiPencil } from 'react-icons/bi';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link,
   Redirect,
   useHistory,
   useLocation
 } from "react-router-dom";

const StyledCard = styled(Card)`
  border: none;
  @media only screen and (max-width: 768px) {
    background-color: #F1F1F1;
    padding: 5%;
  }
`;

const StyledButton = styled.button`
  color: white;
  background-color: #84C0C9;
  border: 2px solid #84C0C9;
  border-radius: 5px;
  padding: 6px 10px; 
  font-size: 14px;
  fontFamily: Roboto;
  

  &:hover{
    color: white;
    background-color: #558E97;
  }
`;

const StyledDiv = styled.div`
   position: absolute;
   top: 0;
   right: 0;
   padding: 1.5vh .5vh;
`;

const StyledModal = styled(Modal)`
  background-color: rgba(0,0,0,0.4);
`

export default function ShiftDetails(props) {
  const {
    id, address, date, startTime, endTime, notes, isAdmin, func
  } = props;
  const [show, setShow] = useState(false);


  async function deleteVigilDocument() {
     setShow(false);
     const res = await firebase.firestore().collection('vigils').doc(id).delete();
     console.log('Delete: ', res);
     func();
  }

  return (
    <StyledCard>
        { isAdmin
          ? (
            <StyledDiv>
              <BiPencil size="32" onClick={() => console.log('Pencil Icon works')} className="mb-4" />
              <BiTrash size="32" onClick={() => setShow(true)} className="mb-4" />
            </StyledDiv>
          )
          : null}
        <Card.Title className="font-weight-bold">{address}</Card.Title>
        <Card.Text>{id}</Card.Text>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{`${startTime} to ${endTime}`}</Card.Text>
        <Card.Subtitle>Notes</Card.Subtitle>
        <Card.Text>{notes}</Card.Text>

        <StyledModal show={show} centered>
           <Modal.Body>
           Are you sure you want to delete this shift?
           </Modal.Body>
           <Modal.Footer>
            <StyledButton onClick={() => setShow(false)}>Cancel</StyledButton>
            <StyledButton onClick={() => deleteVigilDocument()}>Ok</StyledButton>
          </Modal.Footer>
        </StyledModal>
    </StyledCard>
  );
}

ShiftDetails.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  date: PropTypes.array.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
};
