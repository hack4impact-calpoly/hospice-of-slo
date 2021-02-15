import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useHistory } from 'react-router-dom';

export default function Calendar() {
  const history = useHistory();

  /* placeholder events */
  const [events, setEvents] = useState([
    {
      title: 'title1',
      start: '2021-02-10',
      end: '2021-02-16',
      backgroundColor: '#7eb0b8',
      borderColor: '#7eb0b8',
    },
    {
      title: 'title2',
      start: '2021-02-15',
      end: '2021-02-18',
      backgroundColor: '#bfb6e3',
      borderColor: '#bfb6e3',
    },
  ]);

  const handleDateClick = (info) => {
    window.alert(`Clicked on: ${info.dateStr}`);
  };
  /* add an event, can pass props from Create Shift button later */
  const handleDateSelect = (info) => {
    setEvents((oldEvents) => [...oldEvents, {
      ...info,
      title: 'new Event',
    }]);
  };

  const handleEventClick = (info) => {
    window.alert(`${info.event.title} \n${info.event.start}\n${info.event.end}`);
  };

  const toolbar = {
    start: 'title',
    center: 'today',
    end: 'prev,next,addEventButton',
  };

  const title = {
    month: 'long',
    day: 'numeric',
  };

  const addEventButton = {
    text: '+',
    click: () => history.push('/schedule/create-shift'),
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      selectable="true"
      initialView="timeGridDay"
      events={events}
      dateClick={(info) => { handleDateClick(info); }}
      select={(info) => { handleDateSelect(info); }}
      eventClick={(info) => { handleEventClick(info); }}
      customButtons={{ addEventButton }}
      height="80vh"
      headerToolbar={toolbar}
      titleFormat={title}
    />
  );
}
