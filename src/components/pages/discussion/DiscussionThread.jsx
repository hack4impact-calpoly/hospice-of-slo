import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import generateCSV from './DiscussionCSV';
import { FloatingActionButton } from '../../../styled-components/discussion-components';
import HeaderWithBackArrow from '../../navigation/HeaderWithBackArrow';
import CreateMessage from './CreateMessage';
import DiscussionPost from './DiscussionPost';
import actions from '../../../actions';
import { SubmitButton } from '../../../styled-components/form-components';

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

const StyledDiv = styled.div`
  position: fixed;
  right: 100px;
  top: 35px;
`;

const StyledButton = styled(SubmitButton)`
  padding-left: 30px;
  padding-right: 30px;
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
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
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
    usersData.forEach((user) => users.push({ ...(user.data()), userId: user.id }));
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
    messageRef.add(messageData).then((msgRef) => {
      handleClose();
      const theTime = (firebase.firestore.Timestamp.now());
      const newMessages = [...(discussion.messages), {
        message,
        timeSent: theTime,
        userRef,
        messageId: msgRef.id,
      }];
      dispatch(actions.discussions.editDiscussion(discussion.id, {
        ...discussion,
        messages: newMessages,
      }));
    });
  };

  useEffect(() => {
    getPosts();
  }, [discussions]);

  return (
    <div>
      <HeaderWithBackArrow>{title}</HeaderWithBackArrow>
      {isAdmin
        ? (
          <StyledDiv>
            <StyledButton onClick={() => generateCSV(posts, title)}>Export</StyledButton>
          </StyledDiv>
        )
        : null }
      <FloatingActionButton>+</FloatingActionButton>
      {displayEmptySignal()}
      <FloatingActionButton onClick={handleShow}>+</FloatingActionButton>
      <CreateMessage
        show={show}
        handleClose={handleClose}
        discussion={discussion}
        setMessage={setMessage}
        message={message}
        postMessage={postMessage}
      />
      <PostWrapper>
        {posts.sort(compare).map((post) => (
          <DiscussionPost
            key={post.messageId}
            discussion={discussion}
            author={post.user.name}
            userId={post.user.userId}
            timeSent={post.timeSent.toDate()}
            message={post.message}
            setMessage={setMessage}
            messageId={post.messageId}
          />
        ))}
      </PostWrapper>
    </div>
  );
}
