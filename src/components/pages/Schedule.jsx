import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import firebase from 'firebase';
import HeaderWithNav from '../navigation/nav-header';
import ShiftDetails from './shiftDetails';
import Calendar from './Calendar';

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

export default function Schedule(props) {
  const { isAdmin } = props;
  const [show, setShow] = useState(false);
  const [vigils, setVigils] = useState([]);
  const [selectVigil, setSelectVigil] = useState({
    id: '', address: '', dates: [], endTime: '', startTime: '', notes: '',
  });

  const fetchData = async () => {
    const vigilRef = firebase.firestore().collection('vigils');
    const snapshot = await vigilRef.get();
    //  setVigils(snapshot.docs.map(doc => doc.data()));  // Can not do this because we also need to save the doc id, instantly mapping doc.data loses doc id.
    const items = [];
    snapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setVigils(items);
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
      address: vigil.data.address,
      dates: vigil.data.dates,
      startTime: vigil.data.startTime,
      endTime: vigil.data.endTime,
      notes: vigil.data.notes,
    }));
  }

  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Schedule</HeaderWithNav>
      <PaddedDiv>
        {vigils.map((vigil) => (
          <div key={vigil.id}>
            <Button variant="primary" size="sm" onClick={() => handleShow(vigil)}>{vigil.data.address}</Button>
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
            <StyledButton onClick={() => window.alert('Successful sign up!')}>Sign Up</StyledButton>
          </Modal.Footer>
        </Modal>
        <Calendar isAdmin={isAdmin} />
      </PaddedDiv>
    </div>
  );
}

Schedule.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
