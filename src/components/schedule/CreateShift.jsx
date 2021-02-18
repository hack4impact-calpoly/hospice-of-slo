import React from 'react';
import { Form, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from 'firebase/app';
import 'firebase/firestore';
import HeaderWithBackArrow from '../navigation/back-header';
import { SubmitButton, CancelButton } from '../../styled-components/form-components';
import { timeComesBefore, dateComesBefore, getDateRange } from './CreateShiftHelper';

// Styled Components
const PaddedDiv = styled.div`
  padding: 0 5%;
`;

const CenterCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function CreateShift() {
  // Form Stuff
  const {
    register, watch, handleSubmit, errors,
  } = useForm();
  const history = useHistory();

  async function onSubmit(data, event) {
    event.preventDefault();
    const {
      repeats, endRepeatDate, date, ...shift
    } = data;
    shift.dates = repeats ? getDateRange(date, endRepeatDate) : [date];
    const db = firebase.firestore();
    await db.collection('vigils').add(shift);
    history.push('/schedule');
  }

  // Validation Functions
  /* Current Validation:
      - location, date, startTime, and endTime are required
      - endTime must come after startTime
      - If event is repeating, endRepeatDate is required and must come after the start date
  */
  function isEndDateRequired(endRepeatDate) {
    const repeats = watch('repeats', false);
    return !repeats || !!endRepeatDate;
  }

  function endRepeatDateFollows(endRepeatDate) {
    const startRepeatDate = watch('date');
    return dateComesBefore(startRepeatDate, endRepeatDate);
  }

  function endTimeAfterStart(endTime) {
    const startTime = watch('startTime');
    return timeComesBefore(startTime, endTime);
  }

  // React Component
  return (
    <PaddedDiv>
      <HeaderWithBackArrow>Create Shift</HeaderWithBackArrow>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control as="select" name="address" ref={register({ required: true })} isInvalid={!!errors.address}>
            <option value="100 Apple Drive">100 Apple Drive</option>
            <option value="200 Kiwi Lane">200 Kiwi Lane</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">Please provide a location</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" ref={register({ required: true })} isInvalid={!!errors.date} />
          <Form.Control.Feedback type="invalid">Please provide a date</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Row>
            <Col>
              <Form.Control type="time" name="startTime" ref={register({ required: true })} isInvalid={!!errors.startTime} />
              <Form.Control.Feedback type="invalid">Please provide a start time</Form.Control.Feedback>
            </Col>

            <CenterCol xs={2} md={1}>
              <span>to</span>
            </CenterCol>

            <Col>
              <Form.Control
                type="time"
                name="endTime"
                isInvalid={!!errors.endTime}
                ref={register({ required: true, validate: endTimeAfterStart })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.endTime?.type === 'required' && 'Please provide an end time'}
                {errors.endTime?.type === 'validate' && 'This time must come after the starting time'}
              </Form.Control.Feedback>
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Form.Check label="Repeats Daily" name="repeats" ref={register} />
        </Form.Group>

        {watch('repeats', false) && ( // Only render this field if the repeats box is checked
          <Form.Group>
            <Form.Label>End Repeat On</Form.Label>
            <Form.Control
              type="date"
              name="endRepeatDate"
              isInvalid={(!!errors.endRepeatDate)}
              ref={register(
                {
                  validate: {
                    isRequired: isEndDateRequired,
                    endRepeatDateComesAfterStart: endRepeatDateFollows,
                  },
                },
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors.endRepeatDate?.type === 'isRequired' && 'End date is required if the event is repeating'}
              {errors.endRepeatDate?.type === 'endRepeatDateComesAfterStart' && 'This date should occur after your starting date'}
            </Form.Control.Feedback>
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" name="notes" ref={register} />
        </Form.Group>

        <Form.Group>
          <Form.Row>
            <Col><CancelButton onClick={() => history.push('/schedule')}>Cancel</CancelButton></Col>
            <Col xs={1} />
            <Col><SubmitButton type="submit">Add Shift</SubmitButton></Col>
          </Form.Row>
        </Form.Group>
      </Form>
    </PaddedDiv>
  );
}
