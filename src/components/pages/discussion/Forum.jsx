import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import Edit from './EditDiscussion';

const ForumBox = styled.button`
  text-align: left; 
  width: 100%;
  border: none;
  opacity: 80%;
  font-size: 18px;

  :hover{
    opacity: 100%;
  }
`;

const ForumLink = styled(Link)`
  padding: 20px;
  :hover{
    text-decoration: none; 
  }
`;

const Dots = styled(Edit)`
  position: absolute;
  right: 20px;
`;

const Arrow = styled(BiChevronRight)`
  align-self: center;
  margin-left: auto;
  font-size: 30px;
`;

export default function Forum(props) {
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const { title, docId } = props;
  const discussionLink = `/discussion/${docId}`;
  return (
    <Col md={9} lg={8} xl={7}>
      <ForumBox className="mt-3 d-flex">
        <ForumLink to={discussionLink} style={{ width: '100%' }}>
          {title}
        </ForumLink>
        {isAdmin ? <Dots docId={docId} /> : <Arrow />}
      </ForumBox>
    </Col>
  );
}

Forum.propTypes = {
  title: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
};
