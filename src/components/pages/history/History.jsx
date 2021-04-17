import React from 'react';
// import styled from 'styled-components';
// import { useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import HeaderWithNav from '../../navigation/nav-header';
import HistoryForum from './HistoryForum';

export default function History() {
  return (
    <div>
      <HeaderWithNav>Volunteer History</HeaderWithNav>
      <Container>
        <Row key="123" className="justify-content-md-center">
          <HistoryForum title="TEST123" docId="POGGERS" />
        </Row>
      </Container>
    </div>
  );
}
