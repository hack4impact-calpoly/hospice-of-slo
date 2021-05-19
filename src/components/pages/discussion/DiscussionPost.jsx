import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { BiTrash } from 'react-icons/bi';
import { GreyDiv } from '../../../styled-components/discussion-components';
import actions from '../../../actions';

const Author = styled.span`
  font-size: 18px;
  padding-right: 30px;
  color: #424242;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    display: block;  
  }
`;

const Time = styled.span`
  font-size: 16px;
  color: #6C6B6B;
  display: inline-block;

  @media screen and (max-width: 768px) {
    font-size: 12px;  
  }
`;

const StyledModal = styled(Modal)`
  background-color: rgba(0,0,0,0.3);
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

const Message = styled.p`
  margin-top: 6px;
  overflow: hidden;
`;

export default function DiscussionPost({
  author,
  timeSent,
  message,
  userId,
  messageId,
  discussion,
}) {
  const dateOptions = { month: 'short', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const sentAt = `${timeSent.toLocaleDateString(undefined, dateOptions)} at ${timeSent.toLocaleTimeString(undefined, timeOptions)}`;
  const currentUser = (sessionStorage.getItem('userid'));

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  async function deleteThisMessage() {
    firebase.firestore().collection('discussions')
      .doc(discussion.id).collection('messages')
      .doc(messageId)
      .delete()
      .then(() => {
        const newMessages = discussion.messages.filter((m) => m.messageId !== messageId);
        dispatch(actions.discussions.editDiscussion(discussion.id, { ...discussion, messages: newMessages }));
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
    setShow(false);
  }

  return (
    <GreyDiv>
      { (currentUser === userId)
        ? (
          <BiTrash style={{ cursor: 'pointer' }} size="25" onClick={() => setShow(true)} className="mr-2 mb-1" />
        )
        : null}
      <Author>{author}</Author>
      <Time>{sentAt}</Time>
      <Message>{message}</Message>
      <StyledModal show={show} centered>
        <Modal.Body>
          Are you sure you want to delete this message?
        </Modal.Body>
        <Modal.Footer>
          <StyledButton onClick={() => setShow(false)}>Cancel</StyledButton>
          <StyledButton onClick={() => deleteThisMessage()}>Ok</StyledButton>
        </Modal.Footer>
      </StyledModal>
    </GreyDiv>
  );
}

DiscussionPost.propTypes = {
  author: PropTypes.string.isRequired,
  timeSent: PropTypes.instanceOf(Date).isRequired,
  message: PropTypes.string.isRequired,
};
