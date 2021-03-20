import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderWithNav from '../navigation/nav-header';
import CreateThread from './createThread';
import * as constants from '../../constants';
import Forum from './Forum';

export default function Discussion() {
  const isAdmin = useSelector((state) => state.user.user.isAdmin);

  // grabbing vigil information from constant events for now
  const [vigils] = useState([constants.event1, constants.event2, constants.event3]);

  // make a forum link from each vigil
  const forums = vigils.map((v) => (
    <Row key={v.title} className="justify-content-md-center">
      <Forum title={v.title} backgroundColor={v.backgroundColor} docId="6YgbciDAfXmz7KOkT8un" />
    </Row>
  ));

  return (
    <div>
      <HeaderWithNav>Discussions</HeaderWithNav>
      <Link to="/discussion/PiIorC3YwcjdcKLhROCb">View Thread</Link>
      {isAdmin ? <CreateThread /> : null}
      <Container fluid>
        {forums}
      </Container>
    </div>
  );
}
