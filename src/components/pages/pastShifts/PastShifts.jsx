import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import HeaderWithNav from '../../navigation/nav-header';
import PastShiftCard from './PastShiftCard';

const ListWrapper = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  max-width: calc(750px + 30%);
  margin: 0 auto;
`;

export default function Contacts() {
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // Gets User Data from redux store
  const prevShifts = useSelector((state) => state.user.user.prevShifts);
  const [shifts, setShifts] = React.useState([]);

  async function getPastShifts() {
    prevShifts.forEach((shift) => {
      shift.get().then((doc) => {
        setShifts((oldShifts) => [...oldShifts, doc.data()]);
        console.log(doc.data());
      });
    });
  }

  React.useEffect(() => {
    getPastShifts();
  }, []);

  return (
    <div>
      <HeaderWithNav>Past Shifts</HeaderWithNav>
      <ListWrapper>
        {shifts.map((shift) => {
          const time = `${shift.shiftStartTime.toDate().toLocaleTimeString()} to ${shift.shiftEndTime.toDate().toLocaleTimeString()}`;
          const date = `${dayNames[shift.shiftStartTime.toDate().getDay()]} ${shift.shiftStartTime.toDate().getMonth() + 1}/${
            shift.shiftStartTime.toDate().getDate()}/${shift.shiftStartTime.toDate().getFullYear()}`;
          return <PastShiftCard address={shift.address} date={date} time={time} color="#333333" />;
        })}
      </ListWrapper>
    </div>
  );
}
