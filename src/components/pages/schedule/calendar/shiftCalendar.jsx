import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSelector, useDispatch } from "react-redux";
import interactionPlugin from "@fullcalendar/interaction";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";
import styled from "styled-components";
import { vigilPropType } from "../../../../dataStructures/propTypes";
import actions from "../../../../actions";

const StyledDrop = styled.button`
  color: white;
  background-color: #84c0c9;
  border: none;
  border-radius: 7px;
  width: 25%;
  padding: 6px 0px;

  &:hover {
    background-color: #558e97;
  }
`;

const StyledModal = styled(Modal)`
  background-color: rgba(0, 0, 0, 0.5) !important;
`;

function ShiftCalendar({ shift, isSingleDay, curDate }) {
  const { startTime, endTime } = shift;
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState([]);
  const db = firebase.firestore();
  // Gets all shift Data from redux store
  const storeShifts = useSelector((state) => state.historyShifts.historyShifts);
  const thisUser = useSelector((state) => state.user.user.id);

  // Gets all shifts from the vigil that was clicked on.
  const allShifts = [];
  storeShifts.forEach((shift) => {
    allShifts.push(shift)
  });

  const getShifts = () => {
    const shiftData = [];
    allShifts.forEach((shift) => {
      let color = "#8FCBD4";
      let label = shift.name;
      if (shift.isAdmin) {
        color = "#C4C4C4";
        label = "Blocked Off";
      }
      shiftData.push({
        title: label,
        start: shift.shiftStartTime.toDate().toISOString(),
        end: shift.shiftEndTime.toDate().toISOString(),
        backgroundColor: color,
        id: shift.id,
        userId: shift.userId,
      });
    });
    setEventData(shiftData);
  };

  useEffect(() => {
    getShifts();
  }, [storeShifts]); // This useEffect block gets whole collection of vigil documents upon redux updates

  const volunteerCalendarHeader = {
    center: "",
    end: isSingleDay ? "" : "prev,next",
  };
  const validRange = {
    start: startTime,
    end: endTime,
  };
  const scrollTime =
    startTime.getTime() === curDate.getTime()
      ? moment(startTime).format("HH:mm")
      : "06:00";

  const [contactInfo, setContact] = useState({});

  const getContact = async (userId) => {
    const userRef = db.collection("users").doc(userId);
    const user = await userRef.get();
    const { email, phone } = user.data();
    setContact({
      email,
      phone,
      userId,
    });
  };

  const [clickedInfo, setClickedInfo] = useState({
    title: "",
  });

  const handleEventClick = (info) => {
    setClickedInfo({
      title: info.event.title,
      shiftId: info.event.id,
      userId: info.event.extendedProps.userId,
    });
    getContact(info.event.extendedProps.userId);
    setShowModal(true);
  };

  const handleCloseClick = () => setShowModal(false);

  const dispatch = useDispatch();

  const handleDrop = async () => {
    // const vigilRef = db.collection("vigils").doc(clickedInfo.vigilId);
    const shiftRef = db.collection("shifts").doc(clickedInfo.shiftId);
    shiftRef
      .delete()
      .then(() => {
        dispatch(actions.history.deleteHistoryShift(clickedInfo.shiftId));
        dispatch(actions.user.deleteShift(clickedInfo.shiftId));
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });
    const currentUser = sessionStorage.getItem("userid");
    const userRef = db.collection("users").doc(currentUser);
    userRef
      .then(() => {
        dispatch(actions.user.deleteShift(clickedInfo.shiftId));
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });
    handleCloseClick();
  };

  return (
    <>
      <FullCalendar
        initialView="timeGridDay"
        selectable
        plugins={[timeGridPlugin, interactionPlugin]}
        initialDate={curDate}
        scrollTime={scrollTime}
        validRange={validRange}
        events={[...eventData]}
        headerToolbar={volunteerCalendarHeader}
        allDaySlot={false}
        height="400px"
        dayHeaderFormat={{ month: "numeric", day: "numeric" }}
        slotEventOverlap={false}
        eventClick={handleEventClick}
      />
      <StyledModal
        show={showModal}
        onEscapeKeyDown={handleCloseClick}
        onHide={handleCloseClick}
        centered
      >
        <Modal.Header className="font-weight-bold" closeButton>
          Contact Info
        </Modal.Header>
        <Modal.Body>
          <Col>
            <Row>{clickedInfo.title}</Row>
            <a href={`mailto:${contactInfo.email}`}>
              <Row>{contactInfo.email}</Row>
            </a>
            <a href={`sms:+1-${contactInfo.phone}`}>
              <Row>{contactInfo.phone}</Row>
            </a>
          </Col>
        </Modal.Body>
        {contactInfo.userId === thisUser ? (
          <Modal.Footer>
            <StyledDrop type="button" onClick={handleDrop}>
              drop shift
            </StyledDrop>
          </Modal.Footer>
        ) : null}
      </StyledModal>
    </>
  );
}

ShiftCalendar.propTypes = {
  shift: vigilPropType.isRequired,
  isSingleDay: PropTypes.bool.isRequired,
  curDate: PropTypes.instanceOf(Date).isRequired,
};

export default ShiftCalendar;
