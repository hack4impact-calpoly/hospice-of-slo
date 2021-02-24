import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GreyDiv } from '../../styled-components/discussion-components';

const Author = styled.span`
  font-size: 18px;
  padding-right: 30px;
  color: #424242;
  font-weight: bold;
`;

const Date = styled.span`
  font-size: 16px;
  color: #6C6B6B;
  display: inline-block;
`;

const Message = styled.p`
  margin-top: 6px;
`;

export default function DiscussionPost({
  author,
  date,
  message,
}) {
  return (
    <GreyDiv>
      <Author>{author}</Author>
      <Date>{date}</Date>
      <Message>{message}</Message>
    </GreyDiv>
  );
}

DiscussionPost.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
