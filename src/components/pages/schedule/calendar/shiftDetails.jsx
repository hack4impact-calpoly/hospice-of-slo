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

const StyledMidCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  fontFamily Roboto;
  font-weight: bold;
`;

export default function ShiftDetails(props) {
  const {
    id, address, dates, startTime, endTime, notes, setSelectVigil,
  } = props;
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

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
      shiftStartTime,
      shiftEndTime,
      userRef: db.doc(`users/${currentUser}`),
    })
      .then(() => {
        console.log('Document successfully written!');
        // Should navigate back and update with redux.
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

  const times = [ // Placeholder Values. Change at some point
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
      <Row className="mt-2">
        <Col>
          <StyledCard>
            { isAdmin
              ? (
                <StyledDiv>
                  <BiPencil style={{ cursor: 'pointer' }} size="32" onClick={() => editShift()} className="mb-4" />
                  <BiTrash style={{ cursor: 'pointer' }} size="32" onClick={() => setShow(true)} className="mb-4" />
                </StyledDiv>
              )
              : null}
            <Card.Title className="font-weight-bold">{address}</Card.Title>
            <Card.Text>{formattedDate}</Card.Text>
            <Card.Text>{formattedTime}</Card.Text>
            <Card.Subtitle>Notes</Card.Subtitle>
            <Card.Text>{notes}</Card.Text>
            <Card.Subtitle className="mb-1">Time</Card.Subtitle>
            <Row>
              <Col>
                <StyledSelect
                  onChange={(e) => setShiftStart(e.value)}
                  options={times}
                  components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                  maxMenuHeight={250}
                />
              </Col>
              <StyledMidCol sm={1}>
                <p>to</p>
              </StyledMidCol>
              <Col>
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
  id: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
};
