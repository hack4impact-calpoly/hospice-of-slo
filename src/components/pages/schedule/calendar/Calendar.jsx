// Root for Calendar, which is a part of Schedule
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import ShiftDetails from "./shiftDetails";
import { vigilPropType } from "../../../../dataStructures/propTypes";
import "./Calendar.css";

export default function Calendar(props) {
  const { eventData, setSelectVigil } = props;

  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const [addEventText, setAddEventText] = useState("Add Event");
  const [headerText, setHeaderText] = useState("");

  const calendarRef = React.createRef();
  // For Reactiveness
  const updateMedia = () => {
    if (window.innerWidth > 768) {
      calendarRef.current.getApi().changeView("timeGridWeek");
      setAddEventText("Add Event");
      setHeaderText("today prev,next addEventButton");
    } else {
      calendarRef.current.getApi().changeView("timeGridDay");
      setAddEventText("+");
      setHeaderText("prev,next,addEventButton");
    }
  };

  useEffect(() => {
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [clickedInfo, setClickedInfo] = useState({
    id: "",
    address: "",
    endTime: new Date(),
    startTime: new Date(),
    notes: "",
  });
  const [curDate, setCurDate] = useState(new Date());

  const adminCalendarHeader = {
    start: "title",
    center: "",
    end: headerText,
  };

  const volunteerCalendarHeader = {
    start: "title",
    center: "",
    end: "today,prev,next",
  };

  const addEventButton = {
    text: addEventText,
    click: () => history.push("/schedule/create-shift"),
  };

  const updateCurDate = (info) => {
    if (info.view.type === "timeGridDay") {
      // Mobile Logic
      setCurDate(info.view.currentStart);
      return;
    }

    const classes = info.el.classList;
    if (classes.contains("isStart")) {
      // Desktop Logic
      setCurDate(info.event.start);
    } else if (classes.contains("isEnd")) {
      setCurDate(info.event.end);
    } else {
      setCurDate(moment(info.event.start).add(1, "day").toDate());
    }
  };

  const handleEventClick = (info) => {
    setClickedInfo({
      id: info.event.id,
      address: info.event.title,
      endTime: info.event.end,
      startTime: info.event.start,
      notes: info.event.extendedProps.notes,
    });
    updateCurDate(info);
    setShowModal(true);
  };

  // Marks all overlapping events
  const annotatedEventData = (events) => {
    if (events.length === 0) {
      return events;
    }

    const annotatedEvents = [...events];
    annotatedEvents.sort((e1, e2) => e1.start - e2.start);
    let eventCopy = { ...annotatedEvents[0] };
    eventCopy.overlapping = false;
    annotatedEvents[0] = eventCopy;

    for (let i = 1; i < annotatedEvents.length; i += 1) {
      eventCopy = { ...annotatedEvents[i] };
      if (eventCopy.start < annotatedEvents[i - 1].end) {
        eventCopy.overlapping = !annotatedEvents[i - 1].overlapping;
      } else {
        eventCopy.overlapping = false;
      }
      annotatedEvents[i] = eventCopy;
    }
    return annotatedEvents;
  };

  // Add isStart, isEnd, and overlapping-event when neccissary
  const getClassNames = (info) => {
    const classNames = [];
    if (info.isStart) {
      classNames.push("isStart");
    } else if (info.isEnd) {
      classNames.push("isEnd");
    }
    if (info.event.extendedProps.overlapping) {
      classNames.push("overlapping-event");
    }
    return classNames;
  };

  const handleCloseClick = () => setShowModal(false);

  return (
    <div>
      {isAdmin ? (
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          selectable
          events={annotatedEventData(eventData)}
          eventClick={handleEventClick}
          eventClassNames={getClassNames}
          headerToolbar={adminCalendarHeader}
          customButtons={{ addEventButton }}
          height="85vh"
          allDaySlot={false}
        />
      ) : (
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          selectable
          events={annotatedEventData(eventData)}
          eventClick={handleEventClick}
          eventClassNames={getClassNames}
          headerToolbar={volunteerCalendarHeader}
          height="80vh"
          allDaySlot={false}
        />
      )}
      <Modal
        show={showModal}
        size="lg"
        onEscapeKeyDown={handleCloseClick}
        onHide={handleCloseClick}
        centered
      >
        <Modal.Header className="font-weight-bold" closeButton>
          {clickedInfo.address}
        </Modal.Header>
        <Modal.Body>
          <ShiftDetails
            vigil={clickedInfo}
            setSelectVigil={setSelectVigil}
            setShowModal={setShowModal}
            curDate={curDate}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

Calendar.propTypes = {
  eventData: PropTypes.arrayOf(vigilPropType).isRequired,
};
