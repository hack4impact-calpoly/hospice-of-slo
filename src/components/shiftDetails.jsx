/* eslint-disable */

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BiLoaderAlt } from 'react-icons/bi';
import styled from 'styled-components';


const StyledCard = styled(Card)`
  @media only screen and (min-width: 768px) {
    background-color: #F1F1F1;
  }
`;

export default function ShiftDetails(props) {

   return (
      <StyledCard>
         <Card.Body>
            <Card.Title className="font-weight-bold">{props.address}</Card.Title>
            <Card.Text>{props.date}</Card.Text>
            <Card.Text>{props.time}</Card.Text>
            <Card.Subtitle>Notes</Card.Subtitle>
            <Card.Text>{props.notes}</Card.Text>
         </Card.Body>
      </StyledCard>
   );
 }
 