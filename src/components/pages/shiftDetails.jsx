/* eslint-disable */
import React from 'react';
import Card from 'react-bootstrap/Card';
import { BiTrash, BiPencil } from 'react-icons/bi';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledCard = styled(Card)`
  border: none;
  @media only screen and (max-width: 768px) {
    background-color: #F1F1F1;
    padding: 5%;
  }
`;

const StyledDiv = styled.div`
   position: absolute;
   top: 0;
   right: 0;
   padding: 1.5vh .5vh;
`;

export default function ShiftDetails(props) {
  const {
    address, date, time, notes, isAdmin,
  } = props;

  return (
    <StyledCard>
        { isAdmin
          ? (
            <StyledDiv>
              <BiPencil size="32" onClick={() => console.log('Pencil Icon works')} className="mb-4" />
              <BiTrash size="32" onClick={() => console.log('Trash Icon works')} className="mb-4" />
            </StyledDiv>
          )
          : null}
        <Card.Title className="font-weight-bold">{address}</Card.Title>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{time}</Card.Text>
        <Card.Subtitle>Notes</Card.Subtitle>
        <Card.Text>{notes}</Card.Text>
    </StyledCard>
  );
}

ShiftDetails.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
};
