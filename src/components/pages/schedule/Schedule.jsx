// Root for all Things Schedule
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import HeaderWithNav from '../../navigation/nav-header';
import Calendar from './calendar/Calendar';

const PaddedDiv = styled.div`
  padding: 0 2%;
`;

export default function Schedule(props) {
  const { setSelectVigil } = props;
  const [eventData, setEventData] = useState([]);

  // Gets Vigil Data from redux store
  const storeVigils = useSelector((state) => state.vigils.vigils);

  const getVigilInfo = () => {
    const vigilsData = [];
    storeVigils.forEach((v) => {
      vigilsData.push({
        title: v.address,
        start: v.startTime,
        end: v.endTime,
        backgroundColor: '#8FCBD4',
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
        <Calendar eventData={eventData} setSelectVigil={setSelectVigil} />
      </PaddedDiv>
    </div>
  );
}
