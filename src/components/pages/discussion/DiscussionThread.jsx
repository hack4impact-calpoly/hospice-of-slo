/* eslint-disable */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FloatingActionButton } from '../../../styled-components/discussion-components';
import HeaderWithBackArrow from '../../navigation/back-header';
import DiscussionPost from './DiscussionPost';

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
    // Get Messages
    const { messages } = discussion;

  async function getPosts() {
    // Get Title
    setTitle(discussion.name);
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
    const displayEmptySignal = () => {
        console.log(messages.length);
        /* only display empty message if there 
         * are no messages */
        if (messages.length <= 0) {
            return <StyledText>This forum has no messages yet</StyledText>
        }
 

    }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <HeaderWithBackArrow>{title}</HeaderWithBackArrow>
          <FloatingActionButton>+</FloatingActionButton>
          {displayEmptySignal()};
      <PostWrapper>
        {posts.map((post) => <DiscussionPost key={post.timeSent} author={post.user.name} timeSent={post.timeSent.toDate()} message={post.message} />)}
      </PostWrapper>
    </div>
  );
}
