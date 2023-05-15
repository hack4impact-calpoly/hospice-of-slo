import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import { Col, Container, Card, Form, Alert } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";
import { shiftPropType } from "../../../../dataStructures/propTypes";
import { combineDateAndTime } from "../createShift/CreateShiftHelper";
import actions from "../../../../actions";
// import "./modalDetails.css";

const StyledCard = styled(Card)`
  border: none;
`;

const SignUpButton = styled.button`
  color: white;
  background-color: #84c0c9;
  border: 2px solid #84c0c9;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 6px 10px;
  width: 100%;
  font-size: 14px;
  fontfamily: Roboto;

  &:hover {
    color: white;
    background-color: #558e97;
  }
`;

export default function ShiftDetails({ shift, setShowModal, curDate }) {
  // Redux setup
  const dispatch = useDispatch();
  const history = useHistory();
  const { startTime, endTime } = shift;
  const isSingleDay = moment(startTime).isSame(endTime, "day");
  const [shiftStartTime, setShiftStartTime] = useState(
    moment(startTime).format("HH:mm") || ""
  );
  const [shiftEndTime, setShiftEndTime] = useState(
    moment(endTime).format("HH:mm") || ""
  );
  const formStartDate = moment(curDate).format("YYYY-MM-DD");
  const [shiftStartDate, setShiftStartDate] = useState(
    isSingleDay ? formStartDate : moment(startTime).format("YYYY-MM-DD")
  );
  const [shiftEndDate, setShiftEndDate] = useState(
    isSingleDay ? formStartDate : moment(endTime).format("YYYY-MM-DD")
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  console.log({ start: startTime, end: endTime, date: curDate });
  console.log(isSingleDay);

  async function CreateShift(curEvent) {
    //   // Event Editing info
    //   const isEditing = Object.keys(curEvent).length !== 0;
    //   const defaultVals = isEditing ? eventDataToFront(curEvent) : curEvent;

    //   // Form Stuff
    //   const { register, getValues, handleSubmit, errors } = useForm({
    //     defaultValues: defaultVals,
    //   });

    //   const [showDateFeedback, setShowDateFeedback] = React.useState(false);

    // event.preventDefault();

    // if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    //   setShowDateFeedback(true);
    //   return;
    // }
    // setShowDateFeedback(false);
    console.log("current event");
    console.dir(curEvent);
    const newShift = {
      startTime: curEvent.startTime,
      endTime: curEvent.endTime,
      firstName: curEvent.firstName,
      lastName: curEvent.lastName,
    };
    const db = firebase.firestore();

    // if (isEditing) {
    //   // Editing current event
    //   // Changes the address of the vigil
    //   await db.collection("vigils").doc(curEvent.id).set(shift);
    //   // Changes the address of each shift inside of the vigil
    //   await db
    //     .collection("vigils")
    //     .doc(curEvent.id)
    //     .collection("shifts")
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         doc.ref.update({
    //           address: shift.address,
    //         });
    //       });
    //     });

    //   dispatch(
    //     actions.vigils.editVigil(curEvent.id, { ...shift, id: curEvent.id })
    //   );
    // } else {
    //   // Creating new event
    //   const backRef = await db.collection("shifts").add(shift);
    //   await db.collection("discussions").add({
    //     name: shift.firstName,
    //     dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    //     pinned: false,
    //   });
    //   dispatch(actions.vigils.addVigil({ ...shift, id: backRef.id }));
    // }

    await db.collection("shifts").add(newShift);
    await db.collection("discussions").add({
      name: newShift.firstName,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      pinned: false,
    });
    dispatch(actions.history.addHistoryShift({ ...newShift }));

    history.push("/shifts");

    // Validation Functions
    /* Current Validation:
          - date, startTime, and endTime are required
          - endDate must be the same as or come after startDate
          - If startDate and endDate are the same, startTime must come before endTime
      */
  }

  async function addShiftPress() {
    // creates a new shift and adds it to a specific vigil
    const start = combineDateAndTime(shiftStartDate, shiftStartTime);
    const end = combineDateAndTime(shiftEndDate, shiftEndTime);
    const newShift = {
      startTime: start,
      endTime: end,
      firstName,
      lastName,
    };
    console.log(newShift);

    await CreateShift(newShift);
  }

  const [showDateWarning, setShowDateWarning] = useState(
    moment(curDate).isBetween(startTime, endTime, "day", "()")
  ); // This warning displays when we can't guarantee that curDate matches the date the user clicked

  // Form Stuff
  const [validated, setValidated] = useState(false);
  // Checks that the end date comes before the start date
  const endDateRef = React.createRef();
  const [datesInverted, setDatesInverted] = useState(false);

  // Checks that the end time comes before the start time
  const endTimeRef = React.createRef();
  const [endsBeforeStarts, setEndsBeforeStarts] = useState(false);

  useEffect(() => {
    let endTimeHasError = false;
    if (moment(shiftEndDate).isBefore(moment(shiftStartDate))) {
      setDatesInverted(true);
      endDateRef.current.setCustomValidity(
        "End Date cannot come before Start Date"
      );
    } else {
      setDatesInverted(false);
      endDateRef.current.setCustomValidity("");
    }

    const tFormat = "HH:mm";
    if (
      moment(shiftStartDate).isSame(moment(shiftEndDate)) &&
      moment(shiftEndTime, tFormat).isBefore(moment(shiftStartTime, tFormat))
    ) {
      endTimeHasError = true;
      setEndsBeforeStarts(true);
      endTimeRef.current.setCustomValidity(
        "End time cannot come after a vigil has ended."
      );
    } else if (endTimeHasError) {
      setEndsBeforeStarts(false);
    } else {
      setEndsBeforeStarts(false);
      endTimeRef.current.setCustomValidity("");
    }
  }, [shiftEndTime, shiftEndDate, shiftStartDate, shiftStartTime]);

  const handleInputChange = (event, stateSetter) => {
    event.preventDefault();
    stateSetter(event.target.value);
  };

  const validate = (event) => {
    const start = combineDateAndTime(shiftStartDate, shiftStartTime);
    const end = combineDateAndTime(shiftEndDate, shiftEndTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return false;
    }
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate(event)) {
      addShiftPress();
      setShowModal(false);
    }
  };
  return (
    <Container className="modal-container">
      {showDateWarning && (
        <Alert
          variant="primary"
          onClose={() => setShowDateWarning(false)}
          dismissible
        >
          Check that this date is correct
        </Alert>
      )}
      <StyledCard>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label class="form-label">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={firstName}
                  onChange={(e) => handleInputChange(e, setFirstName)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {firstName === "" ? "Please provide a first name " : null}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  placeholder="yyyy/mm/dd"
                  value={shiftStartDate}
                  onChange={(e) => handleInputChange(e, setShiftStartDate)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {shiftStartDate === ""
                    ? "Please provide a starting date "
                    : null}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  placeholder="24-hour time"
                  value={shiftStartTime}
                  onChange={(e) => handleInputChange(e, setShiftStartTime)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {shiftStartTime === ""
                    ? "Please provide a starting time "
                    : null}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={lastName}
                  onChange={(e) => handleInputChange(e, setLastName)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {lastName === "" ? "Please provide a last name " : null}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  placeholder="yyyy/mm/dd"
                  value={shiftEndDate}
                  onChange={(e) => handleInputChange(e, setShiftEndDate)}
                  required
                  ref={endDateRef}
                />
                <Form.Control.Feedback type="invalid">
                  {shiftEndDate === ""
                    ? "Please provide an ending date "
                    : null}
                  {datesInverted
                    ? "End date cannot come before start date "
                    : null}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  placeholder="ex. 18:00"
                  value={shiftEndTime}
                  onChange={(e) => handleInputChange(e, setShiftEndTime)}
                  required
                  ref={endTimeRef}
                />
                <Form.Control.Feedback type="invalid">
                  {shiftEndTime === ""
                    ? "Please provide an ending time "
                    : null}
                  {endsBeforeStarts
                    ? "End time cannot not come before start time "
                    : null}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <SignUpButton type="submit">Sign Up</SignUpButton>
        </Form>
      </StyledCard>
    </Container>
  );
}

ShiftDetails.propTypes = {
  shift: shiftPropType.isRequired,
  setShowModal: PropTypes.func.isRequired,
  curDate: PropTypes.instanceOf(Date).isRequired,
};
