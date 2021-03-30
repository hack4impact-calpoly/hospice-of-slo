import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import ShiftDetails from './shiftDetails';

export default function Calendar(props) {
  const { eventData, setSelectVigil } = props;

  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const [addEventText, setAddEventText] = useState('Add Event');
  const [headerText, setHeaderText] = useState('');

  const calendarRef = React.createRef();
  // For Reactiveness
  const updateMedia = () => {
    if (window.innerWidth > 768) {
      calendarRef.current.getApi().changeView('timeGridWeek');
      setAddEventText('Add Event');
      setHeaderText('today prev,next addEventButton');
    } else {
      calendarRef.current.getApi().changeView('timeGridDay');
      setAddEventText('+');
      setHeaderText('prev,next,addEventButton');
    }
  };

  useEffect(() => {
    updateMedia();
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [clickedInfo, setClickedInfo] = useState({
    id: '', address: '', dates: [], endTime: '', startTime: '', notes: '',
  });

  const adminCalendarHeader = {
    start: 'title',
    center: '',
    end: headerText,
  };

  const volunteerCalendarHeader = {
    start: 'title',
    center: '',
    end: 'today,prev,next',
  };

  const addEventButton = {
    text: addEventText,
    click: () => history.push('/schedule/create-shift'),
  };

  const handleEventClick = (info) => {
    setClickedInfo({
      id: info.event.id,
      address: info.event.title,
      dates: info.event.extendedProps.dates,
      endTime: info.event.extendedProps.eTime,
      startTime: info.event.extendedProps.sTime,
      notes: info.event.extendedProps.notes,
    });
    setShowModal(true);
  };

  const handleCloseClick = () => setShowModal(false);

  return (
    <div>
      {isAdmin
        ? (
          <FullCalendar
            ref={calendarRef}
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            selectable
            events={eventData}
            eventClick={handleEventClick}
            headerToolbar={adminCalendarHeader}
            customButtons={{ addEventButton }}
            height="80vh"
            allDaySlot={false}
          />
        )
        : (
          <FullCalendar
            ref={calendarRef}
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            selectable
            events={eventData}
            eventClick={handleEventClick}
            headerToolbar={volunteerCalendarHeader}
            height="80vh"
            allDaySlot={false}
          />
        )}
      <Modal show={showModal} size="lg" onEscapeKeyDown={handleCloseClick} onHide={handleCloseClick} centered>
        <Modal.Header closeButton>Vigil Details</Modal.Header>
        <Modal.Body>
          <ShiftDetails
            id={clickedInfo.id}
            address={clickedInfo.address}
            dates={clickedInfo.dates}
            startTime={clickedInfo.startTime}
            endTime={clickedInfo.endTime}
            notes={clickedInfo.notes}
            setSelectVigil={setSelectVigil}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

Calendar.propTypes = {
  eventData: PropTypes.arrayOf(PropTypes.object).isRequired,
};