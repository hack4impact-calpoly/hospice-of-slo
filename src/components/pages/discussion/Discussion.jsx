import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import HeaderWithNav from '../../navigation/nav-header';
import CreateThread from './createThread';
import Forum from './Forum';

/* search bar */
const FormS = styled(Form.Control)`
  font-size: 18px;
  background-color: #E5E5E5;
  width: 57.5%;
  position: relative;
  margin: 0 auto;
`;

export default function Discussion() {
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const [searchTerm, setSearchTerm] = useState('');

  const storeDiscussions = useSelector((state) => state.discussions.discussions);

  const forumsPinned = storeDiscussions.map((d) => {
    if (d.pinned) {
      return ([
        <Row key={d.name} className="justify-content-md-center">
          <Forum title={d.name} docId={d.id} />
        </Row>,
      ]);
    }

    return null;
  });
  function compare(a, b) { // sorts in alphabetical order
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  // sort the discussions by most recently created
  storeDiscussions.sort((a, b) => a.dateCreated - b.dateCreated);
  storeDiscussions.reverse();

  /* organize formums based on search and map them */
  const forumsNotPinned = storeDiscussions.filter((discussion) => discussion.name.toLowerCase().includes(searchTerm.toLowerCase())).sort(compare).map((d) => {
    if (!d.pinned) {
      return ([
        <Row key={d.name} className="justify-content-md-center">
          <Forum title={d.name} docId={d.id} />
        </Row>,
      ]);
    }

    return null;
  });

  return (
    <div>
      <HeaderWithNav>Discussions</HeaderWithNav>
      {isAdmin ? <CreateThread /> : null}
      <Col className="search">
        <FormS
          className="mb-3"
          placeholder="search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </Col>

      <Container fluid>

        {forumsPinned}
        {forumsNotPinned}
      </Container>
    </div>
  );
}
