import React, { useState } from 'react';
import {
  Row, Col, Button, Modal, Form,
} from 'react-bootstrap';
import styled from 'styled-components';
import firebase from 'firebase';

const StyledCreate = styled.button`
  color: white;
  background-color: #84C0C9;
  border: none;
  border-radius: 7px;
  width: 25%;
  padding: 6px 0px;

  &:hover{
    background-color: #558E97;
  }
`;

const StyledCancel = styled.button`
  color: #6C6B6B;
  background: none;
  border: none;
  padding: 0 20px 
`;

const StyledHeading = styled.h4`
  text-align: center;
  margin-bottom: 30px;
`;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: flex-end;
  padding: 0 15px; 
`;

const StyledCol = styled(Col)`
  padding: 5%;
`;

const AddThread = styled(Button)`
  border-radius: 50%;
  border: none;
  padding: 1ex 1em;
  position:fixed;
  right: 25px;
  top: 25px;
  background-color: #84C0C9;

  font-size: 20px;
  &:hover{
    background-color: #558E97;
  }
`;

export default function CreateThread() {
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function createDiscussionPress() {
    // creates a new discussion
    const db = firebase.firestore();
    const discussions = db.collection('discussions');
    discussions.add({
      name: title,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(), // time stamp
      pinned: true, // pinned is true by default when manual discussion is created.
    })
      .then(() => {
        console.log('Document successfully written!');
        db.handleClose();
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  return (
    <div>
      <AddThread size="sm" onClick={handleShow}>+</AddThread>
      <Modal show={show} onEscapeKeyDown={handleClose} onHide={handleClose} centered>
        <Modal.Body>
          <StyledCol>
            <StyledHeading> Create New Discussion </StyledHeading>
            <Form.Control
              className="mb-3"
              placeholder="Discussion Name"
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(title);
              }}
            />
            <StyledRow className="mt-3">
              <StyledCancel onClick={handleClose}>Cancel</StyledCancel>
              <StyledCreate type="submit" onClick={createDiscussionPress}>Create</StyledCreate>
            </StyledRow>
          </StyledCol>
        </Modal.Body>
      </Modal>
    </div>
  );
}
