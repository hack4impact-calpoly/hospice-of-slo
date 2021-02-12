import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ShiftDetails from './shiftDetails';

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

export default function ShiftSignup(props) {
  const {
    isAdmin, address, date, time, notes,
  } = props;
  const [startTime, setStart] = useState('');
  const [endTime, setEnd] = useState('');

  const times = [
    { value: '8:00', label: 'This would be the start of given shift' },
    { value: '8:10', label: 'This would be the middle of given shift' },
    { value: '8:20', label: 'This would be the middle of given shift' },
    { value: '8:30', label: 'This would be the middle of given shift' },
    { value: '8:40', label: 'This would be the end of given shift' },
  ];

  // This function is just to check the values selected since it is not linked to backend yet

  const checkSelect = () => {
    console.log(startTime);
    console.log(endTime);
  };

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <ShiftDetails isAdmin={isAdmin} address={address} date={date} time={time} notes={notes} />
        </Col>
      </Row>
      <Row className="mt-4 font-weight-bold">
        <Col>Time</Col>
      </Row>
      <Row>
        <Col>
          <StyledSelect
            onChange={(e) => setStart(e.value)}
            onBlur={checkSelect()}
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
            onChange={(e) => setEnd(e.value)}
            onBlur={checkSelect()}
            options={times}
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            maxMenuHeight={250}
          />
        </Col>
      </Row>
    </Container>

  );
}

ShiftSignup.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  address: PropTypes.bool.isRequired,
  date: PropTypes.bool.isRequired,
  time: PropTypes.bool.isRequired,
  notes: PropTypes.bool.isRequired,
};
