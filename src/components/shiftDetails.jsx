/* eslint-disable */

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BiLoaderAlt } from 'react-icons/bi';
import styled from 'styled-components';


const StyledCard = styled(Card)`
  @media only screen and (min-width: 768px) {
    bg: #F1F1F1;
  }
`;

export default function ShiftDetails(props) {

   return (
      <Card>
         <Card.Body>
            <Card.Title className="font-weight-bold">100 Apple Drive</Card.Title>
            <Card.Text>Tuesday 02/02/2021</Card.Text>
            <Card.Text>8:00 AM to 12:00 PM</Card.Text>
            <Card.Subtitle>Notes</Card.Subtitle>
            <Card.Text>lorem impsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Card.Text>
         </Card.Body>
      </Card>
   );
 }
 