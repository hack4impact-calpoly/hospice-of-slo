import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import firebase from 'firebase/app';
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
  console.log('you are in DISCUSSIONTHREAD');
  const { id } = useParams();
  const discussions = useSelector((store) => store.discussions.discussions);
  let discussion;
  discussions.forEach((d) => {
    if (d.id === id) {
      discussion = d;
    }
  });
  // console.log('The Discussion');
  // console.log(discussion);
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);
  // useSelector((state) => console.log(state));

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
