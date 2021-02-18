import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useHistory } from 'react-router-dom';

export default function DesktopCalendar() {
  const colors = {
    Blue: '#7EB0B8',
    Purple: '#d0caeb',
  };

  // Dummy Data for Dates, eventually should be removed
  const curMonth = (new Date()).getMonth();
  const curDay = (new Date()).getDate();

  const event1 = {
    title: '100 Apple Drive',
    start: new Date(2021, curMonth, curDay, 8),
    end: new Date(2021, curMonth, curDay, 11),
    backgroundColor: colors.Blue,
  };
  const event2 = {
    title: '100 Apple Drive',
    start: new Date(2021, curMonth, curDay + 1, 8),
    end: new Date(2021, curMonth, curDay + 1, 11),
    backgroundColor: colors.Purple,
  };
  // End Dummy Data

  const [events] = useState([event1, event2]);
  const history = useHistory();

  const calendarHeader = {
    start: 'title',
    center: '',
    end: 'today prev,next addEventButton',
  };

  const addEventButton = {
    text: 'Add Event',
    click: () => history.push('/schedule/create-shift'),
  };

  function handleEventClick(eventInfo) {
    // This will eventually render the shiftDetails Component
    console.log(eventInfo.event);
  }

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      selectable
      events={events}
      eventClick={handleEventClick}
      headerToolbar={calendarHeader}
      customButtons={{ addEventButton }}
    />
  );
}
