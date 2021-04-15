/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal, Form } from 'react-bootstrap';
import { FloatingActionButton } from '../../../styled-components/discussion-components';
import HeaderWithBackArrow from '../../navigation/back-header';
import DiscussionPost from './DiscussionPost';

const PostWrapper = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
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

  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);
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
    // Get Messages
    const { messages } = discussion;
    // Populate each user ref from a message
    let usersData = messages.map((message) => message.userRef.get());
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
    messageRef.add(messageData);
    handleClose();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <HeaderWithBackArrow>{title}</HeaderWithBackArrow>
      <FloatingActionButton onClick={handleShow}>+</FloatingActionButton>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{discussion.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
        {posts.map((post) => <DiscussionPost key={post.timeSent} author={post.user.name} timeSent={post.timeSent.toDate()} message={post.message} />)}
      </PostWrapper>
    </div>
  );
}
