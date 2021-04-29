import React, { useState } from 'react';
import {
  Row, Col, Button, Modal, Form,
} from 'react-bootstrap';
import styled from 'styled-components';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { discussionPropType } from '../../../dataStructures/propTypes';
import actions from '../../../actions';

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

export default function CreateThread(props) {
  const { discussion, isEditing } = props;
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Redux setup
  const dispatch = useDispatch();

  async function discussionPress() {
    // creates a new discussion
    const db = firebase.firestore();
    const discussions = db.collection('discussions');
    if (isEditing) { // editing a Discussion name
      discussions.doc(discussion.id)
        .update({
          name: title,
        })
        .then(() => {
          handleClose();
          dispatch(actions.discussions.editDiscussion(discussion.id, { ...discussion, name: title }));
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    } else { // creating a Discussion
      const newDiscussion = {
        name: title,
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(), // time stamp
        pinned: true, // pinned is true by default when manual discussion is created.
      };
      discussions.add(newDiscussion)
        .then((backRef) => {
          dispatch(actions.discussions.addDiscussion({ ...newDiscussion, id: backRef.id, messages: [] }));
          handleClose();
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  }

  return (
    <div>
      {isEditing ? <div role="button" tabIndex={0} onKeyPress={handleShow} onClick={handleShow}>edit</div> : <AddThread size="sm" onClick={handleShow}>+</AddThread>}
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
    </div>
  );
}

CreateThread.propTypes = {
  discussion: discussionPropType,
  isEditing: PropTypes.bool,
};

CreateThread.defaultProps = {
  discussion: {},
  isEditing: false,
};
