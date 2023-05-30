// Root for all Things Schedule
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import HeaderWithNav from "../../navigation/nav-header";
import Calendar from "./calendar/Calendar";

const PaddedDiv = styled.div`
  padding: 0 2%;
`;

export default function Schedule({ setSelectShift }) {
  const [eventData, setEventData] = useState([]);

  // Gets Vigil Data from redux store
  const storeShifts = useSelector((state) => state.historyShifts.historyShifts);
  console.log(storeShifts);

  const getShiftInfo = () => {
    const shiftData = [];
    storeShifts.forEach((s) => {
      const label = `${s.firstName} ${s.lastName}`;
      shiftData.push({
        title: label,
        start: s.startTime,
        end: s.endTime,
        backgroundColor: "#8FCBD4",
        id: s.id,
      });
    });
    setEventData(shiftData);
  };

  useEffect(() => {
    getShiftInfo();
  }, [storeShifts]); // This useEffect block gets whole collection of vigil documents upon redux updates

  return (
    <div>
      <HeaderWithNav>Schedule</HeaderWithNav>
      <PaddedDiv>
        <Calendar eventData={[...eventData]} setSelectShift={setSelectShift} />
      </PaddedDiv>
    </div>
  );
}

Schedule.propTypes = {
  setSelectShift: PropTypes.func.isRequired,
};
