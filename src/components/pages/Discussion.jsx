import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import HeaderWithNav from '../navigation/nav-header';
import CreateThread from './createThread';
import * as constants from '../../constants';
import Forum from './Forum';

export default function Discussion(props) {
  const { isAdmin } = props;
  const value = true; // replace with isAdmin later... after testing

  // grabbing vigil information from constant events for now
  const [vigils] = useState([constants.event1, constants.event2, constants.event3]);

  // make a forum link from each vigil
  const forums = vigils.map((v) => (
    <Row key={v.title} className="justify-content-md-center">
      <Forum title={v.title} backgroundColor={v.backgroundColor} />
    </Row>
  ));

  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Discussions</HeaderWithNav>
      <Link to="/discussion/PiIorC3YwcjdcKLhROCb">View Thread</Link>
      {value ? <CreateThread /> : null}
      <Container fluid>
        {forums}
      </Container>
    </div>
  );
}

Discussion.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
