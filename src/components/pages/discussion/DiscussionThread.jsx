import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import { FloatingActionButton } from '../../../styled-components/discussion-components';
import HeaderWithBackArrow from '../../navigation/HeaderWithBackArrow';
import DiscussionPost from './DiscussionPost';
import actions from '../../../actions';

const PostWrapper = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
`;
const StyledText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #6C6B6B;
`;

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

export default function DiscussionThread() {
  const { id } = useParams();
  const discussions = useSelector((store) => store.discussions.discussions);
  let discussion;
  discussions.forEach((d) => {
    if (d.id === id) {
      discussion = d;
    }
  });
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);
  // Get Messages
  const { messages } = discussion;
  const [message, setMessage] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setMessage('');
  };
  const handleShow = () => setShow(true);

  async function getPosts() {
    // Get Title
    setTitle(discussion.name);
    // Populate each user ref from a message. Changed "message" to "m" because of ESlint
    let usersData = messages.map((m) => m.userRef.get());
    usersData = await Promise.all(usersData);
    const users = [];
    usersData.forEach((user) => users.push(user.data()));
    // Combine each message with its populated user ref
    const populatedMessages = [];
    for (let i = 0; i < messages.length; i += 1) {
      populatedMessages.push({ ...(messages[i]), user: users[i] });
    }
    setPosts(populatedMessages);
  }
  const displayEmptySignal = () => {
    /* only display empty message if there
         * are no messages */
    if (messages.length <= 0) {
      return <StyledText>This forum has no messages yet</StyledText>;
    }
    // return dummy div, ESlint needs map() to have a default return
    return <div />;
  };

  function compare(a, b) { // sorts in alphabetical order
    if (a.timeSent.valueOf() < b.timeSent.valueOf()) {
      return 1;
    }
    if (a.timeSent.valueOf() > b.timeSent.valueOf()) {
      return -1;
    }
    return 0;
  }

  const postMessage = async () => {
    const db = firebase.firestore();
    const currentUser = (sessionStorage.getItem('userid'));
    const userRef = db.collection('users').doc(currentUser);
    const messageRef = db.collection('discussions').doc(discussion.id).collection('messages');
    const messageData = {
      message,
      timeSent: firebase.firestore.FieldValue.serverTimestamp(),
      userRef,
    };
    messageRef.add(messageData).then(() => {
      handleClose();
      const theTime = (firebase.firestore.Timestamp.now());
      const newMessages = [...(discussion.messages), { message, timeSent: theTime, userRef }];
      dispatch(actions.discussions.editDiscussion(discussion.id, { ...discussion, messages: newMessages }));
    });
  };

  useEffect(() => {
    getPosts();
  }, [discussions]);

  return (
    <div>
      <HeaderWithBackArrow>{title}</HeaderWithBackArrow>
      <FloatingActionButton>+</FloatingActionButton>
      {displayEmptySignal()}
      <FloatingActionButton onClick={handleShow}>+</FloatingActionButton>
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
                rows={6}
                value={message}
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
      <PostWrapper>
        {posts.sort(compare).map((post) => <DiscussionPost key={post.timeSent} author={post.user.name} timeSent={post.timeSent.toDate()} message={post.message} />)}
      </PostWrapper>
    </div>
  );
}
