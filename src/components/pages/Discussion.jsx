import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import HeaderWithNav from '../navigation/nav-header';
import CreateThread from './createThread';

export default function Discussion(props) {
  const { isAdmin } = props;
  const value = true; // replace with isAdmin later... after testing

  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Discussion</HeaderWithNav>
      <Link to="/discussion/PiIorC3YwcjdcKLhROCb">View Thread</Link>
      <Col>
        {value ? <CreateThread /> : null}
      </Col>
    </div>
  );
}

Discussion.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
