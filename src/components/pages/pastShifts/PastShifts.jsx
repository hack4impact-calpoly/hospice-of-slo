import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import HeaderWithNav from '../../navigation/nav-header';

const StyledRow = styled(Row)`
  display: flex;
  justify-content: flex-end;
`;

const StyledCol = styled(Col)`
  padding: 3%;
  justify-content: center;
  text-align: center;
  fontWeight: bold;
`;

export default function PastShifts() {
  const data = [{
    name: 'Bruh', vigil: 'also bruh', date: '1/1/11', time: '24:00:00',
  }, {
    name: 'Bruh', vigil: 'also bruh', date: '1/1/11', time: '24:00:00',
  }, {
    name: 'Bruh', vigil: 'also bruh', date: '1/1/11', time: '24:00:00',
  }];

  function aRow(col1, col2, col3, col4, color) {
    return (
      <StyledRow style={{ background: color }} className="justify-content-md-center">
        <StyledCol>
          {col1}
        </StyledCol>
        <StyledCol>
          {col2}
        </StyledCol>
        <StyledCol>
          {col3}
        </StyledCol>
        <StyledCol>
          {col4}
        </StyledCol>
      </StyledRow>
    );
  }
  const topRow = aRow('Name', 'Vigil', 'Date', 'Time', '#C4C4C4');

  const pastRows = data.map((r) => aRow(r.name, r.vigil, r.date, r.time, '#DCDCDC'));

  return (
    <div>
      <HeaderWithNav>Past Shifts</HeaderWithNav>
      <Container>
        {topRow}
        {pastRows}
      </Container>
    </div>
  );
}
