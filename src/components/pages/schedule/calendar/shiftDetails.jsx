import React, { useState } from 'react';
import {
  Row, Col, Container, Card,
} from 'react-bootstrap';
import Select from 'react-select';
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

const StyledSelect = styled(Select)`
  fontFamily: Roboto;
  padding-bottom: 15px;
`;

const LessPadedText = styled(Card.Text)`
  margin-bottom: 5px;
`;

export default function ShiftDetails(props) {
  const {
    id, address, dates, startTime, endTime, notes, setSelectVigil,
  } = props;
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const vigil = {
    id, address, dates, startTime, endTime, notes,
  };

  const dateFormat = 'dddd, MMM D';
  const formattedDate = dates.length === 1
    ? moment(dates[0]).format(dateFormat)
    : `${moment(dates[0]).format(dateFormat)} to ${moment(dates[dates.length - 1]).format(dateFormat)}`;

  const curFormat = 'HH:mm';
  const timeFormat = 'h:mma';
  const formattedTime = `${moment(startTime, curFormat).format(timeFormat)} to ${moment(endTime, curFormat).format(timeFormat)}`;
  const [shiftStartTime, setShiftStart] = useState('');
  const [shiftEndTime, setShiftEnd] = useState('');

  async function addShiftPress() {
    // creates a new shift and adds it to a specific vigil
    const currentUser = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const vigilRef = db.collection('vigils').doc(id);
    vigilRef.collection('shifts').add({
      address: vigil.address,
      shiftStartTime, // TODO: This will need to be put into firebase as a timeStamp
      shiftEndTime, // TODO: This will need to be put into firebase as a timeStamp
      userRef: db.doc(`users/${currentUser}`),
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

  const times = [ // TODO: remove this once select is converted to a dateTime
    { value: '8:00', label: '8:00 A.M.' },
    { value: '8:30', label: '8:30 A.M.' },
    { value: '9:00', label: '9:00 A.M.' },
    { value: '9:30', label: '9:30 A.M.' },
    { value: '10:00', label: '10:00 A.M.' },
  ];

  const editShift = () => {
    setSelectVigil({
      id,
      address,
      dates,
      startTime,
      endTime,
      notes,
    });
    history.push('/schedule/edit-shift');
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <div>
            <Card.Title className="font-weight-bold">Schedule</Card.Title>
            <ShiftCalendar vigil={vigil} />
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
            <Row>
              <Col>
                {/* TODO: Make this select a DateTime */}
                <StyledSelect
                  onChange={(e) => setShiftStart(e.value)}
                  options={times}
                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                  maxMenuHeight={250}
                />
              </Col>
              <p className="pt-1">to</p>
              <Col>
                {/* TODO: Make this select a DateTime */}
                <StyledSelect
                  onChange={(e) => setShiftEnd(e.value)}
                  options={times}
                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                  maxMenuHeight={250}
                />
              </Col>
            </Row>
            <Card.Text>
              <SignUpButton onClick={addShiftPress}>Sign Up</SignUpButton>
            </Card.Text>
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
  id: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
};
