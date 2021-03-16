import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { BiTrash, BiPencil } from 'react-icons/bi';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

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

const StyledDiv = styled.div`
   position: absolute;
   top: 0;
   right: 0;
`;

const StyledModal = styled(Modal)`
  background-color: rgba(0,0,0,0.4);
`;

export default function ShiftDetails(props) {
  const {
    id, address, dates, startTime, endTime, notes, func,
  } = props;
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const dateFormat = 'dddd, MMM D';
  const formattedDate = dates.length === 1
    ? moment(dates[0]).format(dateFormat)
    : `${moment(dates[0]).format(dateFormat)} to ${moment(dates[dates.length - 1]).format(dateFormat)}`;

  const curFormat = 'HH:mm';
  const timeFormat = 'h:mma';
  const formattedTime = `${moment(startTime, curFormat).format(timeFormat)} to ${moment(endTime, curFormat).format(timeFormat)}`;

  async function deleteVigilDocument() {
    setShow(false);
    const res = await firebase.firestore().collection('vigils').doc(id).delete();
    console.log('Delete: ', res);
    func();
  }

  return (
    <StyledCard>
      { isAdmin
        ? (
          <StyledDiv>
            <BiPencil style={{ cursor: 'pointer' }} size="32" onClick={() => history.push('/schedule/edit-shift')} className="mb-4" />
            <BiTrash style={{ cursor: 'pointer' }} size="32" onClick={() => setShow(true)} className="mb-4" />
          </StyledDiv>
        )
        : null}
      <Card.Title className="font-weight-bold">{address}</Card.Title>
      <Card.Text>{formattedDate}</Card.Text>
      <Card.Text>{formattedTime}</Card.Text>
      <Card.Subtitle>Notes</Card.Subtitle>
      <Card.Text>{notes}</Card.Text>

      <StyledModal show={show} centered>
        <Modal.Body>
          Are you sure you want to delete this shift?
        </Modal.Body>
        <Modal.Footer>
          <StyledButton onClick={() => setShow(false)}>Cancel</StyledButton>
          <StyledButton onClick={() => deleteVigilDocument()}>Ok</StyledButton>
        </Modal.Footer>
      </StyledModal>
    </StyledCard>
  );
}

ShiftDetails.propTypes = {
  id: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};
