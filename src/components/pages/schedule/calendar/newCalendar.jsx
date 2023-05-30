import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom"; // eslint-disable-line
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { eventShiftsFormatted } from "./sampleData";
import HeaderWithNav from "../../../navigation/nav-header";
// import "firebase/firestore";
import "./newCalendar.css";
// import mouseOverIcon from "../../../../images/mouseovericon.svg";

const StyledModal = styled(Modal)`
  background-color: rgba(0, 0, 0, 0.3);
`;

const StyledButton = styled.button`
  color: white;
  background-color: #84c0c9;
  border: 2px solid #84c0c9;
  border-radius: 5px;
  padding: 6px 10px;
  font-size: 18px;
  fontfamily: Roboto;

  &:hover {
    color: white;
    background-color: #558e97;
  }
`;

const StyledDiv = styled.div`
  padding: 10px;
  font-size: 18px;
`;

export default function NewCalendar() {
  const [showShiftModal, setShiftModal] = useState(false);
  const [showSelectedItem, setSelectedItem] = useState(null);
  const [isDesktopView, setDesktopView] = useState(window.innerWidth > 900);

  // function handleMouseEnter(info) {
  //   const nameAddressString = info.event.title;
  //   const at = nameAddressString.indexOf("at");
  //   const volunteerName = nameAddressString.slice(0, at);
  //   const eventAddress = nameAddressString.slice(at + 3);
  //   const shiftStartTime = formatDate(info.event.start, {
  //     hour: "numeric",
  //     minute: "2-digit",
  //   });
  //   const shiftEndtime = formatDate(info.event.end, {
  //     hour: "numeric",
  //     minute: "2-digit",
  //   });

  //   const extendedInfoElement = (
  //     <div id="extended-info">
  //       <div className="extended-info-member">
  //         <div className="extended-info-header">
  //           <strong>Volunteer Name:</strong>
  //         </div>
  //         <div className="extended-info-text">{volunteerName}</div>
  //       </div>
  //       <div className="extended-info-member">
  //         <div className="extended-info-header">
  //           <strong>Shift Start:</strong>
  //         </div>
  //         <div className="extended-info-text">{shiftStartTime}</div>
  //       </div>
  //       <div className="extended-info-member">
  //         <div className="extended-info-header">
  //           <strong>Shift End:</strong>
  //         </div>
  //         <div className="extended-info-text">{shiftEndtime}</div>
  //       </div>
  //       <div className="extended-info-member">
  //         <div className="extended-info-header">
  //           <strong>Event Address:</strong>
  //         </div>
  //         <div className="extended-info-text">{eventAddress}</div>
  //       </div>
  //     </div>
  //   );
  //   console.log(extendedInfoElement);
  //   // ReactDOM.render(
  //   //   extendedInfoElement,
  //   //   document.getElementById("extended-info-container")
  //   // );
  // }

  // const extendedInfoPlaceholder = (
  //   <div id="extended-info-placeholder">
  //     <img
  //       id="mouse-over-icon"
  //       src={mouseOverIcon}
  //       alt="Mouse over a shift to see details."
  //     />
  //   </div>
  // );

  // function handleMouseLeave() {
  //   ReactDOM.render(
  //     extendedInfoPlaceholder,
  //     document.getElementById("extended-info-container")
  //   );
  // }

  function handleClick(info) {
    const nameAddressString = info.event.title;
    const at = nameAddressString.indexOf("at");
    const volunteerName = nameAddressString.slice(0, at);
    const eventAddress = nameAddressString.slice(at + 3);
    const shiftStartTime = formatDate(info.event.start, {
      hour: "numeric",
      minute: "2-digit",
    });
    const shiftEndTime = formatDate(info.event.end, {
      hour: "numeric",
      minute: "2-digit",
    });
    const extendedInfoElement = {
      volunteerName,
      shiftStartTime,
      shiftEndTime,
      eventAddress,
    };
    setSelectedItem(extendedInfoElement);
    setShiftModal(true);
  }

  const expandedCalendar = (
    <FullCalendar
      id="expanded-shift-calendar"
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
      events={eventShiftsFormatted}
      eventMaxStack={2}
      displayEventEnd
      eventClick={(info) => handleClick(info)}
      // eventMouseEnter={(info) => handleMouseEnter(info)}
      // eventMouseLeave={(info) => handleMouseLeave(info)}
    />
  );

  const minimizedCalendar = (
    <FullCalendar
      id="minimized-shift-calendar"
      plugins={[timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
      initialView="timeGridDay"
      selectable
      dayMaxEvents
      weekends
      events={eventShiftsFormatted}
      eventMaxStack={3}
      displayEventEnd
      // eventMouseEnter={(info) => handleMouseEnter(info)}
      // eventMouseLeave={(info) => handleMouseLeave(info)}
    />
  );

  // const updateMedia = () => {
  //   if (window.innerWidth > 900) {
  //     ReactDOM.render(
  //       expandedCalendar,
  //       document.getElementById("shift-calendar")
  //     );
  //   }
  // } else {
  //   ReactDOM.render(
  //     minimizedCalendar,
  //     document.getElementById("shift-calendar")
  //   );
  // }
  // };

  const updateMedia = () => {
    setDesktopView(window.innerWidth > 900);
    console.log(window.innerWidth);
    console.log(isDesktopView);
  };

  useEffect(() => {
    // updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isDesktopView]);

  return (
    <div>
      <HeaderWithNav>Schedule</HeaderWithNav>
      <div id="shift-calendar-box">
        {/* <div onClick={handleClick}>{expandedCalendar}</div> */}
        {/* <div id="shift-calendar">{expandedCalendar}</div> */}
        <div id="shift-calendar">
          {isDesktopView ? expandedCalendar : minimizedCalendar}
        </div>
        {/* {isDesktopView ? <p>big</p> : <p>small</p>} */}
        {/* <div id="shift-calendar">{expandedCalendar}</div> */}
        <StyledModal
          show={showShiftModal}
          onHide={() => setShiftModal(false)}
          centered
        >
          <Modal.Body>
            <StyledDiv>
              <div>
                <strong>Volunteer Name:</strong>{" "}
                {showSelectedItem?.volunteerName}
              </div>
              <div>
                <strong>Event Address:</strong> {showSelectedItem?.eventAddress}
              </div>
              <div>
                <strong>Shift Start:</strong> {showSelectedItem?.shiftStartTime}
              </div>
              <div>
                <strong>Shift End:</strong> {showSelectedItem?.shiftEndTime}
              </div>
            </StyledDiv>
          </Modal.Body>
          <StyledButton onClick={() => setShiftModal(false)}>Ok</StyledButton>
        </StyledModal>
        {/* <div id="extended-info-container">{extendedInfoPlaceholder}</div> */}
      </div>
    </div>
  );
}
