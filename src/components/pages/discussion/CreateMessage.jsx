import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledPost = styled.button`
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

const StyledButton = styled(Button)`
  color: white;
  margin-bottom: 12px;
  background-color: #558E97;
  border-radius: 5px;
  padding: 6px 10px; 
  border: none;
  width: 25%;
  font-size: 14px;
  fontFamily: Roboto;
  outline: none !important;
  box-shadow: none !important;

  &:hover{
    color: white;
    background-color: #84C0C9;
  }

  &:focus, &:active {
    background-color: #558E97;
  }
`;

const StyledCancel = styled.button`
  color: #6C6B6B;
  background: none;
  border: none;
  padding: 0 20px 
`;

export default function CreateMessage(props) {
  const {
    show, handleClose, discussion, setMessage, message, postMessage, isEditing,
  } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{discussion.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <StyledButton style={{ float: 'left' }} onClick={() => setMessage('Vigil Under Care')}> Under Care</StyledButton>
          <StyledButton style={{ marginLeft: '12.5%' }} onClick={() => setMessage('Vigil On Hold')}>Vigil On Hold</StyledButton>
          <StyledButton style={{ float: 'right' }} onClick={() => setMessage('Vigil Complete')}> Vigil Complete</StyledButton>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              placeholder="Write a message here..."
              defaultValue={isEditing ? message : ''}
              rows={6}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <StyledCancel variant="secondary" onClick={handleClose}>
          Cancel
        </StyledCancel>
        <StyledPost variant="primary" onClick={postMessage}>
          Post
        </StyledPost>
      </Modal.Footer>
    </Modal>
  );
}
