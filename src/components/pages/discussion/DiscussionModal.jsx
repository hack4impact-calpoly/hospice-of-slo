import React from 'react';
import {
  Row, Col, Modal, Form,
} from 'react-bootstrap';
import styled from 'styled-components';

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

const StyledHeading = styled.h4`
  text-align: center;
  margin-bottom: 30px;
`;

const StyledCancel = styled.button`
  color: #6C6B6B;
  background: none;
  border: none;
  padding: 0 20px
`;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: flex-end;
  padding: 0 15px;
`;

const StyledCol = styled(Col)`
  padding: 5%;
`;

export default function DiscussionModal(props) {
  const {
    show, handleClose, isEditing, setTitle, discussion, discussionPress,
  } = props;
  return (
    <Modal show={show} onEscapeKeyDown={handleClose} onHide={handleClose} centered>
      <Modal.Body>
        <StyledCol>
          <StyledHeading>{isEditing ? 'Edit Discussion' : 'Create New Discussion'}</StyledHeading>
          <Form.Control
            className="mb-3"
            placeholder={isEditing ? discussion.name : 'Discussion Name'}
            defaultValue={isEditing ? discussion.name : ''}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <StyledRow className="mt-3">
            <StyledCancel onClick={handleClose}>Cancel</StyledCancel>
            <StyledCreate
              type="submit"
              onClick={discussionPress}
            >
              {isEditing ? 'Done' : 'Create'}
            </StyledCreate>
          </StyledRow>
        </StyledCol>
      </Modal.Body>
    </Modal>
  );
}
