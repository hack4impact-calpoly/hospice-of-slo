/* eslint-disable */
import React, { useState } from 'react';
import {
  Row, Col, Button, Modal, Form,
} from 'react-bootstrap';
import styled from 'styled-components';
import { BsFillCircleFill } from 'react-icons/bs';
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

const ColorDiv = styled.div`
  width: 85%;
  padding: 0 5px;
`;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: flex-end;
  padding: 0 15px; 
`;

const CenteredCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [color, setColor] = useState('Blue');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const colors = {
    Blue: '#7EB0B8',
    Purple: '#d0caeb',
    Grey: '#C4C4C4',
  };

  const colorOptions = Object.keys(colors).map((c) => <option key={c}>{c}</option>);

  const handleColor = (e) => {
    setColor(e.target.value);
  };
    async function createDiscussionPress() {
        // creates a new discussion
        const db = firebase.firestore();
        const discussions = db.collection('discussions');
        discussions.add({
            name: title,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp(), // time stamp
            pinned: true, // pinned is true by default
        })
            .then(() => {
                console.log('Document successfully written!');
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
            <Form.Control
              className="mb-3"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(title);
              }}
            />
            <Form.Row>
              <ColorDiv>
                <Form.Control as="select" value={color} onChange={handleColor}>
                  {colorOptions}
                </Form.Control>
              </ColorDiv>
              <CenteredCol>
                <BsFillCircleFill color={colors[color]} size={25} />
              </CenteredCol>
            </Form.Row>
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
