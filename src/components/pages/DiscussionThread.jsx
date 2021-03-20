import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FloatingActionButton } from '../../styled-components/discussion-components';
import HeaderWithBackArrow from '../navigation/back-header';
import DiscussionPost from './DiscussionPost';

const PostWrapper = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
`;

export default function DiscussionThread() {
  const { id } = useParams();
  const db = firebase.firestore();
  const discussionDB = db.collection('discussions').doc(id);
  const messagesDB = discussionDB.collection('messages');
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);

  const storeDiscussions = useSelector((state) => state.discussions.discussions);
  console.log('storeDiscussions');
  console.log(storeDiscussions);

  async function getPosts() {
    // Get Title
    const discussionData = await discussionDB.get();
    setTitle(discussionData.data().name);
    // Get Messages
    const messagesData = await messagesDB.get();
    const messages = [];
    messagesData.forEach((message) => messages.push(message.data()));
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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <HeaderWithBackArrow>{title}</HeaderWithBackArrow>
      <FloatingActionButton>+</FloatingActionButton>
      <PostWrapper>
        {posts.map((post) => <DiscussionPost key={post.timeSent} author={post.user.name} timeSent={post.timeSent.toDate()} message={post.message} />)}
      </PostWrapper>
    </div>
  );
}
