import React, { useState } from "react";
import ReactDOM from "react-dom"; // eslint-disable-line
import { useHistory } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "react-bootstrap";
import { eventShiftsFormatted } from "./sampleData";
import "./newCalendar.css";
import mouseOverIcon from "../../../../images/mouseovericon.svg";
import ModalDetails from "./modalDetails";

export default function NewCalendar() {
  const [showModal, setShowModal] = useState(false);
  const [curDate, setCurDate] = useState(Date());
  const [clickedInfo, setClickedInfo] = useState({
    id: "",
    address: "",
    endTime: new Date(),
    startTime: new Date(),
    notes: "",
  });
  const handleCloseClick = () => setShowModal(false);

  const history = useHistory();

  const addEventButton = {
    text: "Add Event",
    click: () => history.push("/schedule/create-shift"),
  };

  // const addShiftButton = {
  //   text: "Add Shift",
  //   click: () => setShowModal(true),
  // };

  function handleMouseEnter(info) {
    const nameAddressString = info.event.title;
    const at = nameAddressString.indexOf("at");
    const volunteerName = nameAddressString.slice(0, at);
    const eventAddress = nameAddressString.slice(at + 3);
    const shiftStartTime = info.start;
    const shiftEndTime = info.end;

    console.log({ start: shiftStartTime, end: shiftEndTime });
    const extendedInfoElement = (
      <div id="extended-info">
        <div className="extended-info-member">
          <div className="extended-info-header">
            <strong>Volunteer Name:</strong>
          </div>
          <div className="extended-info-text">{volunteerName}</div>
        </div>
        <div className="extended-info-member">
          <div className="extended-info-header">
            <strong>Shift Start:</strong>
          </div>
          <div className="extended-info-text">{shiftStartTime}</div>
        </div>
        <div className="extended-info-member">
          <div className="extended-info-header">
            <strong>Shift End:</strong>
          </div>
          <div className="extended-info-text">{shiftEndTime}</div>
        </div>
        <div className="extended-info-member">
          <div className="extended-info-header">
            <strong>Event Address:</strong>
          </div>
          <div className="extended-info-text">{eventAddress}</div>
        </div>
      </div>
    );
    ReactDOM.render(
      extendedInfoElement,
      document.getElementById("extended-info-container")
    );
  }

  const extendedInfoPlaceholder = (
    <div id="extended-info-placeholder">
      <img
        id="mouse-over-icon"
        src={mouseOverIcon}
        alt="Mouse over a shift to see details."
      />
    </div>
  );

  function handleMouseLeave() {
    ReactDOM.render(
      extendedInfoPlaceholder,
      document.getElementById("extended-info-container")
    );
  }

  function handleSelection(info) {
    setClickedInfo({ endTime: info.end, startTime: info.start });
    setCurDate(info.start);
    setShowModal(true);
  }

  const expandedCalendar = (
    <FullCalendar
      id="expanded-shift-calendar"
      plugins={[timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today addEventButton",
        center: "title",
        right: "",
      }}
      initialView="timeGridWeek"
      selectable
      dayMaxEvents
      weekends
      events={eventShiftsFormatted}
      eventMaxStack={2}
      displayEventEnd
      customButtons={{ addEventButton }}
      eventMouseEnter={(info) => handleMouseEnter(info)}
      eventMouseLeave={(info) => handleMouseLeave(info)}
      select={(info) => handleSelection(info)}
    />
  );

  // const minimizedCalendar = (
  //   <FullCalendar
  //     id="minimized-shift-calendar"
  //     plugins={[timeGridPlugin, interactionPlugin]}
  //     headerToolbar={{
  //       left: "prev,next today",
  //       center: "title",
  //       right: "",
  //     }}
  //     initialView="timeGridDay"
  //     selectable
  //     dayMaxEvents
  //     weekends
  //     events={eventShiftsFormatted}
  //     eventMaxStack={3}
  //     displayEventEnd
  //     eventMouseEnter={(info) => handleMouseEnter(info)}
  //     eventMouseLeave={(info) => handleMouseLeave(info)}
  //     dateClick={(info) => handleMouseClick(info)}
  //   />
  // );

  // const updateMedia = () => {
  //   if (window.innerWidth > 900) {
  //     ReactDOM.render(
  //       expandedCalendar,
  //       document.getElementById("shift-calendar")
  //     );
  //   } else {
  //     ReactDOM.render(
  //       minimizedCalendar,
  //       document.getElementById("shift-calendar")
  //     );
  //   }
  // };

  // useEffect(() => {
  //   updateMedia();
  //   window.addEventListener("resize", updateMedia);
  //   return () => window.removeEventListener("resize", updateMedia);
  // });

  return (
    <div id="shift-calendar-box">
      <div id="shift-calendar">
        {expandedCalendar}
        <Modal
          show={showModal}
          size="md"
          onEscapeKeyDown={handleCloseClick}
          onHide={handleCloseClick}
          centered
        >
          <Modal.Header className="font-weight-bold" closeButton>
            Sign up for a Shift
          </Modal.Header>
          <Modal.Body>
            <ModalDetails
              vigil={clickedInfo}
              setShowModal={setShowModal}
              curDate={curDate}
            />
          </Modal.Body>
        </Modal>
      </div>
      <div id="extended-info-container">{extendedInfoPlaceholder}</div>
    </div>
  );
}
