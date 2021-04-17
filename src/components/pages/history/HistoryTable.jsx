import React from 'react';
import styled from 'styled-components';
// import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
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

export default function HistoryTable() {
  // const storeUsers = useSelector((state) => state.users.users);
  const { id } = useParams();
  // const allShifts = [];
  // storeUsers.forEach((user) => {
  //     if (user.prevShifts.length > 0) {
  //     user.prevShifts.forEach((shift) => {
  //         const oneShift = {};
  //         oneShift.ref = shift;
  //         oneShift.name = user.name;
  //         allShifts.push(oneShift);
  //     });
  //     }
  // });

  // const data = allShifts.map(async (shift) => {
  //     const shiftData = {
  //     name: shift.name,
  //     };
  //     await shift.ref.get().then((docSnapshot) => {
  //     const {
  //         address, shiftStartTime, shiftEndTime,
  //     } = docSnapshot.data();
  //     shiftData.vigil = address;
  //     shiftData.date = shiftStartTime;
  //     shiftData.time = shiftEndTime;
  //     });
  //     console.log('SHIFT DATA');
  //     console.log(shiftData);
  //     return shiftData;
  // });

  // console.log('data');
  // console.log(data);

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

  // const pastRows = data.map((r) => aRow(r.name, r.vigil, r.date, r.time, '#DCDCDC'));

  return (
    <div>
      <HeaderWithNav>{id}</HeaderWithNav>
      <Container>
        {topRow}
      </Container>
    </div>
  );
}
