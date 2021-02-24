import React from 'react';
import styled from 'styled-components';
import { FloatingActionButton } from '../../styled-components/discussion-components';
import HeaderWithBackArrow from '../navigation/back-header';
import DiscussionPost from './DiscussionPost';

const PostWrapper = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
`;

export default function DiscussionThread() {
  return (
    <div>
      <HeaderWithBackArrow>100 Apple Drive</HeaderWithBackArrow>
      <FloatingActionButton>+</FloatingActionButton>
      <PostWrapper>
        <DiscussionPost author="John Doe" date="Jan 3 at 12:35 PM" message="Status: On vigil" />
        <DiscussionPost author="Lila Flynn" date="Jan 3 at 9:32 AM" message="Status: On vigil" />
        <DiscussionPost author="Sophia French" date="Jan 2 at 11:35 AM" message="Status: On vigil" />
      </PostWrapper>
    </div>
  );
}
