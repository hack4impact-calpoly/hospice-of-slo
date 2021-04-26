import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import ShiftDetails from './shiftDetails';
import { vigilPropType } from '../../../../dataStructures/propTypes';

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
    id: '', address: '', endTime: new Date(), startTime: new Date(), notes: '',
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
      endTime: info.event.end,
      startTime: info.event.start,
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
            height="85vh"
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
        <Modal.Header className="font-weight-bold" closeButton>{clickedInfo.address}</Modal.Header>
        <Modal.Body>
          <ShiftDetails
            vigil={clickedInfo}
            setSelectVigil={setSelectVigil}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

Calendar.propTypes = {
  eventData: PropTypes.arrayOf(vigilPropType).isRequired,
};
