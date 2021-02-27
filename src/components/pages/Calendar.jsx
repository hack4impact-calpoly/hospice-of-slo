/* eslint-disable */
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import * as constants from '../../constants';

const StyledCard = styled(Card)`
  border: none;
`;

export default function Calendar(props) {
  const { isAdmin } = props;

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

  const [events] = useState([constants.event1, constants.event2, constants.event3]);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [clickedInfo, setClickedInfo] = useState({
    title: '', startTime: '', endTime: ''});

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
    // window.alert(`${info.event.title} \n${info.event.start}\n${info.event.end}`);
    setClickedInfo({title: info.event.title, startTime: info.event.startStr, endTime: info.event.endStr});
    console.log(info);
    console.log('_________');
    console.log(clickedInfo);
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
            events={events}
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
            events={events}
            eventClick={handleEventClick}
            headerToolbar={volunteerCalendarHeader}
            height="80vh"
            allDaySlot={false}
          />
        )}
      <Modal show={showModal} size="lg" onEscapeKeyDown={handleCloseClick} onHide={handleCloseClick} centered>
        <Modal.Header closeButton>Vigil Details</Modal.Header>
        <Modal.Body>
          <StyledCard>
            <Card.Body>
              <Card.Title>
                {clickedInfo.title}
              </Card.Title>
              <Card.Text>
                Start time: {clickedInfo.startTime}
              </Card.Text>
              <Card.Text>
                End time: {clickedInfo.endTime}
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Modal.Body>
      </Modal>
    </div>
  );
}

Calendar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
