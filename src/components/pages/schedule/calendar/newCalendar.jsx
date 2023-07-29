import React, { useState, useEffect, useRef } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getFormattedShifts } from "./sampleData";
import ModalDetails from "./modalDetails";
import HeaderWithNav from "../../../navigation/nav-header";
import "./newCalendar.css";
import DeleteShift from "./deleteShift";
// import "firebase/firestore";
// import mouseOverIcon from "../../../../images/mouseovericon.svg";

// const StyledDiv = styled.div`
//   padding: 10px;
//   font-size: 18px;
// `;

export default function NewCalendar() {
  const [showShiftModal, setShiftModal] = useState(false);
  const [showSelectedItem, setSelectedItem] = useState(null);
  const [isDesktopView, setDesktopView] = useState(window.innerWidth > 900);
  const calendarRef = useRef();

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

  function handleClick(info) {
    const shiftId = info.event.id;
    const volName = info.event.title;
    // const shiftStartTime = formatDate(info.event.start, {
    //   hour: "numeric",
    //   minute: "2-digit",
    // });
    // const shiftEndTime = formatDate(info.event.end, {
    //   hour: "numeric",
    //   minute: "2-digit",
    // });
    const shiftStartDay = formatDate(info.event.start, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const shiftEndDay = formatDate(info.event.end, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const shiftStartTime = formatDate(info.event.start, {
      hour: "numeric",
      minute: "2-digit",
    });
    const shiftEndTime = formatDate(info.event.end, {
      hour: "numeric",
      minute: "2-digit",
    });
    const extendedInfoElement = {
      shiftId,
      volName,
      shiftStartTime,
      shiftEndTime,
      shiftStartDay,
      shiftEndDay,
    };
    setSelectedItem(extendedInfoElement);
    setShiftModal(true);
  }

  function handleSelection(info) {
    setClickedInfo({ endTime: info.end, startTime: info.start });
    setCurDate(new Date(info.start));
    setShowModal(true);
  }

  useEffect(() => {
    const handleResize = () => {
      const desktopView = window.innerWidth > 900;
      setDesktopView(desktopView);

      // get the calendar API and change the view
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(desktopView ? "timeGridWeek" : "timeGridDay");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // const expandedCalendar = (
  //   <FullCalendar
  // plugins={[timeGridPlugin, interactionPlugin]}
  // headerToolbar={{
  //   left: "prev,next today",
  //   center: "title",
  //   right: "",
  // }}
  // initialView={isDesktopView ? "timeGridWeek" : "timeGridDay"}
  // selectable
  // dayMaxEvents
  // weekends
  // events={eventData}
  // eventMaxStack={2}
  // displayEventEnd
  //     select={(info) => handleSelection(info)}
  //     eventClick={(info) => handleClick(info)}
  //     // eventMouseEnter={(info) => handleMouseEnter(info)}
  //     // eventMouseLeave={(info) => handleMouseLeave(info)}
  //   />
  // );

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
  //     events={eventData}
  //     eventMaxStack={3}
  //     displayEventEnd
  //     select={(info) => handleSelection(info)}
  //     eventClick={(info) => handleClick(info)}
  //   />
  // );

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

  return (
    <div>
      <HeaderWithNav>Schedule</HeaderWithNav>
      <div id="shift-calendar-box">
        <div id="shift-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            initialView={isDesktopView ? "timeGridWeek" : "timeGridDay"}
            selectable
            dayMaxEvents
            weekends
            events={eventData}
            eventMaxStack={2}
            displayEventEnd
            select={(info) => handleSelection(info)}
            eventClick={(info) => handleClick(info)}
          />
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
        {/* {isDesktopView ? <p>big</p> : <p>small</p>} */}
        {/* <div id="shift-calendar">{expandedCalendar}</div> */}
        {/* serves as Delete Shift function */}

        <DeleteShift
          showMain={showShiftModal}
          selectedInfo={showSelectedItem}
          setShowModal={setShiftModal}
          centered
        />

        {/* <div id="extended-info-container">{extendedInfoPlaceholder}</div> */}
      </div>
    </div>
  );
}
