import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { vigilPropType } from '../../../../dataStructures/propTypes';

function ShiftCalendar({ vigil }) {
  const { startTime, endTime } = vigil;

  // Dummy Data
  const shifts = [
    {
      start: new Date('April 20, 2021 08:00'),
      end: new Date('April 20, 2021 09:30'),
      title: 'Shift 1',
      backgroundColor: '#8FCBD4',
    },
    {
      start: new Date('April 20, 2021 12:00'),
      end: new Date('April 20, 2021 14:00'),
      title: 'Shift 2',
      backgroundColor: '#8FCBD4',
    },
    {
      start: new Date('April 20, 2021 13:00'),
      end: new Date('April 20, 2021 16:00'),
      title: 'Shift 3',
      backgroundColor: '#8FCBD4',
    },
  ];
  // End Dummy Data

  return (
    <FullCalendar
      initialView="timeGridDay"
      plugins={[timeGridPlugin]}
      initialDate={startTime}
      events={[...shifts]}
      headerToolbar={false}
      allDaySlot={false}
      slotMinTime={startTime}
      slotMaxTime={endTime}
      height="100%"
      dayHeaderFormat={{ month: 'numeric', day: 'numeric' }}
      slotEventOverlap={false}
    />
  );
}

ShiftCalendar.propTypes = {
  vigil: vigilPropType.isRequired,
};

export default ShiftCalendar;
