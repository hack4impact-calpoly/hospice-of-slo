import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GreyDiv } from '../../../styled-components/discussion-components';

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

const Message = styled.p`
  margin-top: 6px;
  overflow: hidden;
`;

export default function DiscussionPost({
  author,
  timeSent,
  message,
}) {
  const dateOptions = { month: 'short', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const sentAt = `${timeSent.toLocaleDateString(undefined, dateOptions)} at ${timeSent.toLocaleTimeString(undefined, timeOptions)}`;

  return (
    <GreyDiv>
      <Author>{author}</Author>
      <Time>{sentAt}</Time>
      <Message>{message}</Message>
    </GreyDiv>
  );
}

DiscussionPost.propTypes = {
  author: PropTypes.string.isRequired,
  timeSent: PropTypes.instanceOf(Date).isRequired,
  message: PropTypes.string.isRequired,
};
