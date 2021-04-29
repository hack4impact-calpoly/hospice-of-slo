import React from 'react';
import { Form, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useDispatch } from 'react-redux';
import HeaderWithBackArrow from '../../../navigation/back-header';
import { SubmitButton, CancelButton } from '../../../../styled-components/form-components';
import {
  timeComesBefore, eventDataToFront, combineDateAndTime, dateComesBefore,
} from './CreateVigilHelper';
import { vigilPropType } from '../../../../dataStructures/propTypes';
import actions from '../../../../actions';

// Styled Components
const PaddedDiv = styled.div`
  padding: 0 5%;
`;

const CenterCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function CreateVigil({ curEvent }) {
  // Event Editing info
  const isEditing = Object.keys(curEvent).length !== 0;
  const defaultVals = isEditing ? eventDataToFront(curEvent) : curEvent;

  // Redux setup
  const dispatch = useDispatch();

  // Form Stuff
  const {
    register, getValues, handleSubmit, errors,
  } = useForm({ defaultValues: defaultVals });
  const history = useHistory();

  async function onSubmit(data, event) {
    event.preventDefault();
    const {
      address, startDate, startTime, endDate, endTime, notes,
    } = data;
    const shift = {
      address,
      startTime: combineDateAndTime(startDate, startTime),
      endTime: combineDateAndTime(endDate, endTime),
      notes,
    };
    const db = firebase.firestore();

    if (isEditing) { // Editing current event
      await db.collection('vigils').doc(curEvent.id).set(shift);
      dispatch(actions.vigils.editVigil(curEvent.id, { ...shift, id: curEvent.id }));
    } else { // Creating new event
      const backRef = await db.collection('vigils').add(shift);
      await db.collection('discussions').add({
        name: shift.address,
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        pinned: false,
      });
      dispatch(actions.vigils.addVigil({ ...shift, id: backRef.id }));
    }

    history.push('/schedule');
  }

  // Validation Functions
  /* Current Validation:
        - location, date, startTime, and endTime are required
        - endDate must be the same as or come after startDate
        - If startDate and endDate are the same, startTime must come before endTime
    */

  function endDateAfterStart(endDate) {
    const startDate = getValues('startDate');
    return dateComesBefore(startDate, endDate);
  }

  function endTimeAfterStart(endTime) {
    const { startDate, endDate, startTime } = getValues();
    return startDate !== endDate || timeComesBefore(startTime, endTime);
  }

  // React Component
  return (
    <PaddedDiv>
      <HeaderWithBackArrow>{isEditing ? 'Edit Vigil' : 'Create Vigil'}</HeaderWithBackArrow>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control name="address" ref={register({ required: true })} isInvalid={!!errors.address} />
          <Form.Control.Feedback type="invalid">Please provide a location</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Start</Form.Label>
          <Form.Row>
            <Col>
              <Form.Control type="date" name="startDate" ref={register({ required: true })} isInvalid={!!errors.startDate} />
              <Form.Control.Feedback type="invalid">Please provide a starting date</Form.Control.Feedback>
            </Col>
            <CenterCol xs={2} md={1} />
            <Col>
              <Form.Control type="time" name="startTime" ref={register({ required: true })} isInvalid={!!errors.startTime} />
              <Form.Control.Feedback type="invalid">Please provide a starting time</Form.Control.Feedback>
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Form.Label>End</Form.Label>
          <Form.Row>
            <Col>
              <Form.Control
                type="date"
                name="endDate"
                ref={register({ required: true, validate: endDateAfterStart })}
                isInvalid={!!errors.endDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.endDate?.type === 'required' && 'Please provide an ending date'}
                {errors.endDate?.type === 'validate' && 'This date should be the same as or after the starting date'}
              </Form.Control.Feedback>
            </Col>
            <CenterCol xs={2} md={1} />
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
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" name="notes" ref={register} />
        </Form.Group>

        <Form.Group>
          <Form.Row>
            <Col><CancelButton onClick={() => history.push('/schedule')}>Cancel</CancelButton></Col>
            <Col xs={1} />
            <Col><SubmitButton type="submit">{isEditing ? 'Update Vigil' : 'Add Vigil'}</SubmitButton></Col>
          </Form.Row>
        </Form.Group>
      </Form>
    </PaddedDiv>
  );
}

CreateVigil.propTypes = {
  curEvent: vigilPropType,
};

CreateVigil.defaultProps = {
  curEvent: {},
};

export default CreateVigil;
