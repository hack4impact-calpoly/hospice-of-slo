import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSelector } from 'react-redux';
import interactionPlugin from '@fullcalendar/interaction';
import { vigilPropType } from '../../../../dataStructures/propTypes';

function ShiftCalendar({ vigil }) {
  const { startTime, endTime } = vigil;

  const [eventData, setEventData] = useState([]);

  // Gets all shift Data from redux store
  const storeShifts = useSelector((state) => state.historyShifts.historyShifts);

  // Gets all shifts from the vigil that was clicked on.
  const vigilShifts = [];
  storeShifts.forEach((shift) => {
    if (shift.address === vigil.address) {
      vigilShifts.push(shift);
    }
  });

  const getShifts = () => {
    const vigilsData = [];
    vigilShifts.forEach((shift) => {
      vigilsData.push({
        title: shift.name,
        start: shift.shiftStartTime.toDate().toISOString(),
        end: shift.shiftEndTime.toDate().toISOString(),
        backgroundColor: '#8FCBD4',
      });
    });
    setEventData(vigilsData);
  };

  useEffect(() => {
    getShifts();
  }, [storeShifts]); // This useEffect block gets whole collection of vigil documents upon redux updates

  const volunteerCalendarHeader = {
    center: '',
    end: 'prev,next',
  };
  const validRange = {
    start: startTime,
    end: endTime,
  };
  return (
    <FullCalendar
      initialView="timeGridDay"
      plugins={[timeGridPlugin, interactionPlugin]}
      initialDate={startTime}
      validRange={validRange}
      events={[...eventData]}
      headerToolbar={volunteerCalendarHeader}
      allDaySlot={false}
      height="400px"
      dayHeaderFormat={{ month: 'numeric', day: 'numeric' }}
      slotEventOverlap={false}
    />
  );
}

ShiftCalendar.propTypes = {
  vigil: vigilPropType.isRequired,
};

export default ShiftCalendar;
