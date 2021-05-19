import React, { useEffect, useState } from 'react';
import {
  Row, Col, Container, Card, Form,
} from 'react-bootstrap';
import { BiTrash, BiPencil } from 'react-icons/bi';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import actions from '../../../../actions';
import ShiftCalendar from './shiftCalendar';
import { vigilPropType } from '../../../../dataStructures/propTypes';
import { combineDateAndTime } from '../createVigil/CreateVigilHelper';

const StyledCard = styled(Card)`
  border: none;
`;

const StyledButton = styled.button`
  color: white;
  background-color: #84C0C9;
  border: 2px solid #84C0C9;
  border-radius: 5px;
  padding: 6px 10px; 
  font-size: 14px;
  fontFamily: Roboto;
  
  &:hover{
    color: white;
    background-color: #558E97;
  }
`;

const SignUpButton = styled.button`
  color: white;
  background-color: #84C0C9;
  border: 2px solid #84C0C9;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 6px 10px; 
  width: 100%;
  font-size: 14px;
  fontFamily: Roboto;
  
  &:hover{
    color: white;
    background-color: #558E97;
  }
`;

const StyledDiv = styled.div`
   position: absolute;
   top: 0;
   right: 0;
`;

const StyledModal = styled(Modal)`
  background-color: rgba(0,0,0,0.4);
`;

const LessPadedText = styled(Card.Text)`
  margin-bottom: 5px;
`;

export default function ShiftDetails({ vigil, setSelectVigil, setShowModal }) {
  const {
    id, address, startTime, endTime, notes,
  } = vigil;
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const isSingleDay = moment(startTime).isSame(endTime, 'day');
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const dateFormat = 'dddd, MMM D';
  const formattedDate = isSingleDay
    ? moment(startTime).format(dateFormat)
    : `${moment(startTime).format(dateFormat)} to ${moment(endTime).format(dateFormat)}`;

  const timeFormat = 'h:mma';
  const formattedTime = `${moment(startTime).format(timeFormat)} to ${moment(endTime).format(timeFormat)}`;
  const [shiftStartTime, setShiftStartTime] = useState('');
  const [shiftEndTime, setShiftEndTime] = useState('');
  const formStartDate = moment(startTime).format('YYYY-MM-DD');
  const [shiftStartDate, setShiftStartDate] = useState(isSingleDay ? formStartDate : '');
  const [shiftEndDate, setShiftEndDate] = useState(isSingleDay ? formStartDate : '');

  async function addShiftPress() {
    // creates a new shift and adds it to a specific vigil
    const currentUser = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const vigilRef = await db.collection('vigils').doc(id);
    const userRef = await db.collection('users').doc(currentUser);
    const user = await userRef.get();
    const { name } = await user.data();
    const newShift = {
      address: vigil.address,
      shiftStartTime: combineDateAndTime(shiftStartDate, shiftStartTime),
      shiftEndTime: combineDateAndTime(shiftEndDate, shiftEndTime),
      userRef: db.doc(`users/${currentUser}`),
    };
    vigilRef.collection('shifts').add(newShift)
      .then((ref) => {
        const reduxStartTime = firebase.firestore.Timestamp.fromDate(combineDateAndTime(shiftStartDate, shiftStartTime));
        const reduxEndTime = firebase.firestore.Timestamp.fromDate(combineDateAndTime(shiftEndDate, shiftEndTime));
        dispatch(actions.user.addShift({
          ...newShift,
          shiftStartTime: reduxStartTime,
          shiftEndTime: reduxEndTime,
          id: ref.id,
        }));
        dispatch(actions.history.addHistoryShift({
          ...newShift,
          id: ref.id,
          shiftStartTime: reduxStartTime,
          shiftEndTime: reduxEndTime,
          name,
          userId: currentUser,
          vigilId: vigilRef.id,
        }));
        return userRef.update({
          prevShifts: firebase.firestore.FieldValue.arrayUnion(ref),
        });
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  async function deleteVigilDocument() {
    await firebase.firestore().collection('vigils').doc(id).delete();
    dispatch(actions.vigils.deleteVigil(id));
    setShow(false);
  }

  const editShift = () => {
    setSelectVigil({
      id,
      address,
      startTime,
      endTime,
      notes,
    });
    history.push('/schedule/edit-shift');
  };

  // Form Stuff
  const [validated, setValidated] = useState(false);
  // Checks that the end date comes before the start date
  const endDateRef = React.createRef();
  const startDateRef = React.createRef();
  const [datesInverted, setDatesInverted] = useState(false);
  const [dateAfterVigilEnd, setDatesAfterVigilEnd] = useState(false);
  const [dateBeforeVigilStarts, setDateBeforeVigilStarts] = useState(false);

  // Checks that the end time comes before the start time
  const endTimeRef = React.createRef();
  const [endsBeforeStarts, setEndsBeforeStarts] = useState(false);

  // Checks that selected start is within vigil time
  const startTimeRef = React.createRef();
  const [beforeStart, setBeforeStart] = useState(false);
  const [afterEnd, setAfterEnd] = useState(false);

  useEffect(() => {
    let endDateHasError = false;
    let endTimeHasError = false;
    if (moment(shiftEndDate).isBefore(moment(shiftStartDate))) {
      endDateHasError = true;
      setDatesInverted(true);
      endDateRef.current.setCustomValidity('End Date cannot come before Start Date');
    } else {
      setDatesInverted(false);
    }

    if (endDateRef.current) {
      if (moment(shiftEndDate).isAfter(moment(endTime))) {
        endDateHasError = true;
        setDatesAfterVigilEnd(true);
        endDateRef.current.setCustomValidity('End Date cannot come after Vigil Ends');
      } else if (endDateHasError) {
        setDatesAfterVigilEnd(false);
      } else {
        setDatesAfterVigilEnd(false);
        endDateRef.current.setCustomValidity('');
      }
      if (moment(shiftStartDate).isBefore(moment(startTime), 'day')) {
        setDateBeforeVigilStarts(true);
        startDateRef.current.setCustomValidity('Start date should not come before Vigil Starts');
      } else {
        setDateBeforeVigilStarts(false);
        startDateRef.current.setCustomValidity('');
      }
    }

    const tFormat = 'HH:mm';
    if (moment(shiftStartDate).isSame(moment(shiftEndDate))
      && moment(shiftEndTime, tFormat).isBefore(moment(shiftStartTime, tFormat))) {
      endTimeHasError = true;
      setEndsBeforeStarts(true);
      endTimeRef.current.setCustomValidity('End time cannot come after a vigil has ended.');
    } else if (endTimeHasError) {
      setEndsBeforeStarts(false);
    } else {
      setEndsBeforeStarts(false);
      endTimeRef.current.setCustomValidity('');
    }

    // Check if selection is before shift starts
    if (moment(combineDateAndTime(shiftStartDate, shiftStartTime)).isBefore(startTime)) {
      setBeforeStart(true);
      startTimeRef.current.setCustomValidity('Start time cannot come before a vigil has started');
    } else {
      setBeforeStart(false);
      startTimeRef.current.setCustomValidity('');
    }

    // Check if selection is after shift ends
    if (moment(combineDateAndTime(shiftEndDate, shiftEndTime)).isAfter(endTime)) {
      setAfterEnd(true);
      endTimeRef.current.setCustomValidity('End time cannot come after a vigil has ended.');
    } else if (!endTimeHasError) {
      setAfterEnd(false);
      endTimeRef.current.setCustomValidity('');
    } else {
      setAfterEnd(false);
      endTimeRef.current.setCustomValidity('Only End Time Before Start Time Should Display');
    }
  }, [shiftEndTime, shiftEndDate, shiftStartDate, shiftStartTime]);

  const handleInputChange = (event, stateSetter) => {
    event.preventDefault();
    stateSetter(event.target.value);
  };

  const validate = (event) => {
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
    <Container>
      <Row>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <div>
            <Card.Title className="font-weight-bold">Schedule</Card.Title>
            <ShiftCalendar vigil={vigil} isSingleDay={isSingleDay} />
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <StyledCard>
            { isAdmin
              ? (
                <StyledDiv>
                  <BiPencil style={{ cursor: 'pointer' }} size="32" onClick={() => editShift()} className="mb-4" />
                  <BiTrash style={{ cursor: 'pointer' }} size="32" onClick={() => setShow(true)} className="mb-4" />
                </StyledDiv>
              )
              : null}
            <Card.Title className="font-weight-bold">Details</Card.Title>
            <LessPadedText>{formattedDate}</LessPadedText>
            <Card.Text>{formattedTime}</Card.Text>
            <Card.Subtitle className="font-weight-bold">Notes</Card.Subtitle>
            <Card.Text>{notes}</Card.Text>
            <Card.Subtitle className="font-weight-bold pb-2">Sign up for a Shift</Card.Subtitle>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {!isSingleDay && (
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={shiftStartDate}
                        onChange={(e) => handleInputChange(e, setShiftStartDate)}
                        required
                        ref={startDateRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {shiftStartDate === ''
                          ? 'Please provide a starting date '
                          : null}
                        {dateBeforeVigilStarts
                          ? 'Start date cannot come before vigil starts'
                          : null}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={shiftEndDate}
                        onChange={(e) => handleInputChange(e, setShiftEndDate)}
                        required
                        ref={endDateRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {shiftEndDate === ''
                          ? 'Please provide an ending date '
                          : null }
                        {datesInverted
                          ? 'End date cannot come before start date '
                          : null }
                        {dateAfterVigilEnd
                          ? 'End date cannot come after vigil ends'
                          : null }
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Form.Row>
              )}
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="startTime"
                      value={shiftStartTime}
                      onChange={(e) => handleInputChange(e, setShiftStartTime)}
                      required
                      ref={startTimeRef}
                    />
                    <Form.Control.Feedback type="invalid">
                      {shiftStartTime === ''
                        ? 'Please provide a starting time '
                        : null }
                      {beforeStart
                        ? 'Start time cannot come before a vigil has started'
                        : null }
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="endTime"
                      value={shiftEndTime}
                      onChange={(e) => handleInputChange(e, setShiftEndTime)}
                      required
                      ref={endTimeRef}
                    />
                    <Form.Control.Feedback type="invalid">
                      {shiftEndTime === ''
                        ? 'Please provide an ending time '
                        : null}
                      {endsBeforeStarts
                        ? 'End time cannot not come before start time '
                        : null}
                      {afterEnd
                        ? 'End time cannot be after a vigil has ended.'
                        : null}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
              <SignUpButton type="submit">Sign Up</SignUpButton>
            </Form>
            <StyledModal show={show} centered>
              <Modal.Body>
                Are you sure you want delete this Vigil?
              </Modal.Body>
              <Modal.Footer>
                <StyledButton onClick={() => setShow(false)}>Cancel</StyledButton>
                <StyledButton onClick={() => deleteVigilDocument()}>Ok</StyledButton>
              </Modal.Footer>
            </StyledModal>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
}

ShiftDetails.propTypes = {
  vigil: vigilPropType.isRequired,
  setSelectVigil: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
