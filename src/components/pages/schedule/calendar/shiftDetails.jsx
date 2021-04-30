import React, { useState } from 'react';
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
    const vigilRef = db.collection('vigils').doc(id);
    vigilRef.collection('shifts').add({
      address: vigil.address,
      shiftStartTime: combineDateAndTime(shiftStartDate, shiftStartTime),
      shiftEndTime: combineDateAndTime(shiftEndDate, shiftEndTime),
      userRef: db.doc(`users/${currentUser}`),
    })
      .then((ref) => {
        const userRef = db.collection('users').doc(currentUser);
        return userRef.update({
          prevShifts: firebase.firestore.FieldValue.arrayUnion(ref),
        });
      })
      .then(() => {
        console.log('Document successfully written!');
        // TODO: Redux changes should be added here instead of the console.log
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
  const handleInputChange = (event, stateSetter) => {
    event.preventDefault();
    stateSetter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addShiftPress();
    setShowModal(false);
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
            <Form onSubmit={handleSubmit}>
              {!isSingleDay && (
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={shiftStartDate}
                        onChange={(e) => handleInputChange(e, setShiftStartDate)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={shiftEndDate}
                        onChange={(e) => handleInputChange(e, setShiftEndDate)}
                        required
                      />
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
                      value={shiftStartTime}
                      onChange={(e) => handleInputChange(e, setShiftStartTime)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={shiftEndTime}
                      onChange={(e) => handleInputChange(e, setShiftEndTime)}
                      required
                    />
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
