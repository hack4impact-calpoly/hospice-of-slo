import React, { useEffect, useState } from 'react';
import {
  Row, Col, Container, Card, Form, Alert,
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

export default function ShiftDetails({
  vigil,
  setSelectVigil,
  setShowModal,
  curDate,
}) {
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
  const [showDateFeedback, setShowDateFeedback] = useState(false);

  async function addShiftPress() {
    // creates a new shift and adds it to a specific vigil
    const currentUser = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const vigilRef = await db.collection('vigils').doc(id);
    const userRef = await db.collection('users').doc(currentUser);
    const user = await userRef.get();
    const { name } = await user.data();
    const start = combineDateAndTime(shiftStartDate, shiftStartTime);
    const end = combineDateAndTime(shiftEndDate, shiftEndTime);
    const newShift = {
      address: vigil.address,
      shiftStartTime: start,
      shiftEndTime: end,
      userRef: db.doc(`users/${currentUser}`),
    };

    setShowDateFeedback(false);

    vigilRef.collection('shifts').add(newShift)
      .then((ref) => {
        const reduxStartTime = firebase.firestore.Timestamp.fromDate(start);
        const reduxEndTime = firebase.firestore.Timestamp.fromDate(end);

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
        userRef.update({
          prevShifts: firebase.firestore.FieldValue.arrayUnion(ref),
        });
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  const [showDateWarning, setShowDateWarning] = useState(
    moment(curDate).isBetween(startTime, endTime, 'day', '()'),
  ); // This warning displays when we can't garuntee that curDate matches the date the user clicked

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
  useEffect(() => {
    if (endDateRef.current) {
      if (moment(shiftEndDate).isBefore(moment(shiftStartDate))) {
        endDateRef.current.setCustomValidity('End Date cannot come before Start Date');
      } else {
        endDateRef.current.setCustomValidity('');
      }
    }
  }, [shiftEndDate]);

  // Checks that the end time comes before the start time
  const endTimeRef = React.createRef();
  useEffect(() => {
    const tFormat = 'HH:mm';
    if (moment(shiftStartDate).isSame(moment(shiftEndDate))
      && moment(shiftEndTime, tFormat).isBefore(moment(shiftStartTime, tFormat))) {
      endTimeRef.current.setCustomValidity('End Time cannot come before Start Time');
    } else {
      endTimeRef.current.setCustomValidity('');
    }
  }, [shiftEndTime, shiftEndDate, shiftStartDate, shiftStartTime]);

  const handleInputChange = (event, stateSetter) => {
    event.preventDefault();
    stateSetter(event.target.value);
  };

  const validate = (event) => {
    const start = (combineDateAndTime(shiftStartDate, shiftStartTime));
    const end = (combineDateAndTime(shiftEndDate, shiftEndTime));

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setShowDateFeedback(true);
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
    <Container>
      <Row>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <div>
            {showDateWarning
              && (
              <Alert variant="primary" onClose={() => setShowDateWarning(false)} dismissible>
                Check that this date is correct
              </Alert>
              )}
            <Card.Title className="font-weight-bold">Schedule</Card.Title>
            <ShiftCalendar vigil={vigil} isSingleDay={isSingleDay} curDate={curDate} />
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
                        placeholder="yyyy/mm/dd"
                        value={shiftStartDate}
                        onChange={(e) => handleInputChange(e, setShiftStartDate)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a starting date
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
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
                        {shiftEndDate === ''
                          ? 'Please provide an ending date'
                          : 'End date should not come before Start Date'}
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
                      placeholder="24-hour time"
                      value={shiftStartTime}
                      onChange={(e) => handleInputChange(e, setShiftStartTime)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a starting time
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
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
                      {shiftEndTime === ''
                        ? 'Please provide an ending time'
                        : 'End Time should not come before Start Time'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
              {showDateFeedback
                ? (
                  <Form.Row>
                    <Col>
                      <div style={{ color: '#ff0000' }}>Please enter the correct date and time format.</div>
                    </Col>
                  </Form.Row>
                ) : null}
              <SignUpButton type="submit">Sign Up</SignUpButton>
            </Form>
            <StyledModal show={show} centered>
              <Modal.Body>
                Are you sure you want to delete this Vigil?
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
  curDate: PropTypes.instanceOf(Date).isRequired,
};
