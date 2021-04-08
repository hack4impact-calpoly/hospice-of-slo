import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';

const ForumBox = styled.button`
  width: 100%;
  border: none;
  padding: 20px;
  opacity: 80%;
  font-size: 18px;

  :hover{
    opacity: 100%;
  }
`;

const ForumLink = styled(Link)`
  :hover{
    text-decoration: none; 
  }
`;

const Arrow = styled(BiChevronRight)`
  align-self: center;
  margin-left: auto;
  font-size: 30px;
`;

export default function Forum(props) {
  const { title, docId } = props;
  const discussionLink = `/discussion/${docId}`;
  return (
    <Col md={9} lg={8} xl={7}>
      <ForumLink to={discussionLink} style={{ width: '100%' }}>
        <ForumBox
          className="mt-3 d-flex"
        >
          {title}
          <Arrow />
        </ForumBox>
      </ForumLink>
    </Col>
  );
}

Forum.propTypes = {
  title: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
};
