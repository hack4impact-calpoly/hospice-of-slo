// Root for all Things Schedule
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import HeaderWithNav from "../../navigation/nav-header";
import newCalendar from "./calendar/newCalendar";

const PaddedDiv = styled.div`
  padding: 0 2%;
`;

export default function Schedule(props) {
  const { setSelectVigil } = props;
  const [eventData, setEventData] = useState([]);

  // Gets Vigil Data from redux store
  const storeShifts = useSelector((state) => state.vigils.vigils);
  const getShiftInfo = () => {
    const shiftData = [];
    storeVigils.forEach((v) => {
      vigilsData.push({
        title: v.address,
        start: v.startTime,
        end: v.endTime,
        backgroundColor: "#8FCBD4",
        notes: v.notes,
        id: v.id,
      });
    });
    setEventData(vigilsData);
  };

  useEffect(() => {
    getVigilInfo();
  }, [storeVigils]); // This useEffect block gets whole collection of vigil documents upon redux updates

  return (
    <div>
      <HeaderWithNav>Schedule</HeaderWithNav>
      <PaddedDiv>
        <NewCalendar eventData={eventData} setSelectVigil={setSelectVigil} />
      </PaddedDiv>
    </div>
  );
}

Schedule.propTypes = {
  setSelectVigil: PropTypes.func.isRequired,
};
