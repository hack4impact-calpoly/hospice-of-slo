import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import { AiFillPushpin } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import Edit from './EditDiscussion';

const ForumBox = styled.button`
  text-align: left; 
  width: 100%;
  border: none;
  background-color: #f2f2f2;
  font-size: 18px;

  :hover{
    background-color: #efefef;
  }
`;

const ForumLink = styled(Link)`
  padding: 20px;
  :hover{
    text-decoration: none; 
  }
`;

const Dots = styled(Edit)`
  margin-left: auto;
  align-self: center;
`;

const Arrow = styled(BiChevronRight)`
  font-size: 30px;
  align-self: center;
  margin-left: auto;
`;

const Pin = styled(AiFillPushpin)`
  color: 'blue';
  font-size: 30px;
  margin-left: auto;
  align-self: center;
`;

export default function Forum(props) {
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const { title, docId, isPinned } = props;
  const discussionLink = `/discussion/${docId}`;
  return (
    <Col md={9} lg={8} xl={7}>
      <ForumBox className="mt-3 d-flex">
        <ForumLink to={discussionLink} style={{ width: '100%' }}>
          {title}
        </ForumLink>
        <IconContext.Provider value={{ color: '#84C0C9' }}>
          {isPinned ? <Pin /> : null }
        </IconContext.Provider>
        {isAdmin ? <Dots docId={docId} /> : <Arrow />}

      </ForumBox>
    </Col>
  );
}

Forum.propTypes = {
  title: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
  isPinned: PropTypes.bool,
};

Forum.defaultProps = {
  isPinned: false,
};
