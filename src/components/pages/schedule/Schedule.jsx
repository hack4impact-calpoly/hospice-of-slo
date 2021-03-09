import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import HeaderWithNav from '../../navigation/nav-header';
import ShiftDetails from './shiftDetails';
import Calendar from './Calendar';
import eventPropType from '../../../dataStructures/propTypes';

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
const PaddedDiv = styled.div`
  padding: 0 2%;
`;
async function addShiftPress() {
  // creates a new shift and adds it to a specific vigil

  console.log('press');
  const currentUser = firebase.auth().currentUser.uid;
  //  console.log("ID " + vigil.id);
  const db = firebase.firestore();
  const vigilRef = db.collection('vigils').doc('kEtigasg0zFzkhYBaWGc');
  vigilRef.collection('shift').add({
    shiftStartTime: 'start', // vigil.startTime,
    shiftEndTime: 'end', // vigil.endTime,
    userID: currentUser,
  })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
}

export default function Schedule({ isAdmin, selectVigil, setSelectVigil }) {
  const [show, setShow] = useState(false);
  const [vigils, setVigils] = useState([]);

  // Gets Vigil Data from redux store
  const storeVigils = useSelector((state) => state.vigils.vigils);
  console.log(storeVigils);

  const fetchData = async () => {
    setVigils(storeVigils);
  };

  useEffect(() => {
    fetchData();
  }, []); // This useEffect block gets whole collection of vigil documents upon rendering of this component

  function handleClose() {
    setShow(false);
    fetchData(); // After delete, we now want to refetch the newly updated document collection, this function is passed down as prop to shiftDetails
  }

  function handleShow(vigil) {
    setShow(true);
    setSelectVigil((prevState) => ({
      ...prevState,
      id: vigil.id,
      address: vigil.address,
      dates: vigil.dates,
      startTime: vigil.startTime,
      endTime: vigil.endTime,
      notes: vigil.notes,
    }));
  }

  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Schedule</HeaderWithNav>
      <PaddedDiv>
        {vigils.map((vigil) => (
          <div key={vigil.id}>
            <Button variant="primary" size="sm" onClick={() => handleShow(vigil)}>{vigil.address}</Button>
          </div>
        ))}
        <Modal show={show} size="lg" onEscapeKeyDown={handleClose} onHide={handleClose} centered>
          <Modal.Header closeButton>Shift Details</Modal.Header>
          <Modal.Body>
            <ShiftDetails
              isAdmin={isAdmin}
              func={handleClose}
              id={selectVigil.id}
              address={selectVigil.address}
              dates={selectVigil.dates}
              startTime={selectVigil.startTime}
              endTime={selectVigil.endTime}
              notes={selectVigil.notes}
            />
          </Modal.Body>
          <Modal.Footer>
            <StyledButton onClick={addShiftPress}>Sign Up</StyledButton>
          </Modal.Footer>
        </Modal>
        <Calendar isAdmin={isAdmin} />
      </PaddedDiv>
    </div>
  );
}

Schedule.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  selectVigil: eventPropType.isRequired,
  setSelectVigil: PropTypes.func.isRequired,
};
