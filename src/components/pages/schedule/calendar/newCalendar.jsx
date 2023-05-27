import React, { useState, useEffect } from "react";
import moment from "moment";
import ReactDOM from "react-dom"; // eslint-disable-line
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getFormattedShifts } from "./sampleData";
import "./newCalendar.css";
import mouseOverIcon from "../../../../images/mouseovericon.svg";
import ModalDetails from "./modalDetails";

export default function NewCalendar() {
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState([]);
  const storeShifts = useSelector((state) => state.historyShifts.historyShifts);
  // const thisUser = useSelector((state) => state.user.user.id);
  // Gets all shifts from the vigil that was clicked on.
  function getShifts(shifts) {
    const allShifts = [];
    shifts.forEach((shift) => allShifts.push(shift));
    return allShifts;
  }
  useEffect(() => {
    setEventData(getFormattedShifts(getShifts(storeShifts)));
  }, [storeShifts]); // This useEffect block gets whole collection of shift documents upon redux updates

  const [curDate, setCurDate] = useState(new Date());
  const [clickedInfo, setClickedInfo] = useState({
    id: "",
    endTime: new Date(),
    startTime: new Date(),
    firstName: "",
    lastName: "",
  });
  const handleCloseClick = () => setShowModal(false);

  // const history = useHistory();

  // // const addEventButton = {
  // //   text: "Add Event",
  // //   click: () => history.push("/schedule/create-shift"),
  // // };

  // const addShiftButton = {
  //   text: "Add Shift",
  //   click: () => setShowModal(true),
  // };

  function handleMouseEnter(info) {
    const volunteerName = info.event.title;
    // const eventAddress = nameAddressString.slice(at + 3);
    const shiftStartTime = moment(info.event.start).format("hh:mm MM/DD/YYYY");
    const shiftEndTime = moment(info.event.end).format("hh:mm MM/DD/YYYY");

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
        {/* <div className="extended-info-member">
          <div className="extended-info-header">
            <strong>Event Address:</strong>
          </div>
          <div className="extended-info-text">{eventAddress}</div>
        </div> */}
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
    setCurDate(new Date(info.start));
    setShowModal(true);
  }

  const expandedCalendar = (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
      initialView="timeGridWeek"
      selectable
      dayMaxEvents
      weekends
      events={eventData}
      eventMaxStack={2}
      displayEventEnd
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
              shift={clickedInfo}
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
