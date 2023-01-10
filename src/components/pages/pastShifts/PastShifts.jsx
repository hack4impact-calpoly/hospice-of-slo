// Root for all Things realted to viewing Past Shifts
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import HeaderWithNav from "../../navigation/nav-header";
import PastShiftCard from "./PastShiftCard";

const ListWrapper = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  max-width: calc(750px + 30%);
  margin: 0 auto;
`;

const StyledText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #6c6b6b;
`;

export default function PastShifts() {
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  // Gets User Data from redux store
  const prevShifts = useSelector((state) => state.user.user.prevShifts);
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const [shifts, setShifts] = React.useState([]);

  async function getPastShifts() {
    prevShifts.forEach((shift) => {
      setShifts((oldShifts) => [...oldShifts, shift]);
    });
  }

  function compare(a, b) {
    // sorts in chronological order
    if (a.shiftStartTime.valueOf() < b.shiftStartTime.valueOf()) {
      return 1;
    }
    if (a.shiftStartTime.valueOf() > b.shiftStartTime.valueOf()) {
      return -1;
    }
    return 0;
  }

  React.useEffect(() => {
    getPastShifts();
  }, []);

  return (
    <div>
      <HeaderWithNav>
        {isAdmin ? "Blocked Off Shifts" : "Past Shifts"}
      </HeaderWithNav>
      {shifts.length === 0 && (
        <StyledText>You currently have no shifts</StyledText>
      )}
      <ListWrapper>
        {shifts.sort(compare).map((shift) => {
          const time = `${shift.shiftStartTime
            .toDate()
            .toLocaleTimeString()} to ${shift.shiftEndTime
            .toDate()
            .toLocaleTimeString()}`;
          const date = `${dayNames[shift.shiftStartTime.toDate().getDay()]} ${
            shift.shiftStartTime.toDate().getMonth() + 1
          }/${shift.shiftStartTime.toDate().getDate()}/${shift.shiftStartTime
            .toDate()
            .getFullYear()}`;
          return (
            <PastShiftCard
              key={shift.id}
              address={shift.address}
              date={date}
              time={time}
              color="#333333"
            />
          );
        })}
      </ListWrapper>
    </div>
  );
}
