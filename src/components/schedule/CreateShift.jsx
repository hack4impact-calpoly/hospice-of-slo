/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { BsFillCircleFill } from 'react-icons/bs';
import { withRouter } from 'react-router-dom';
import HeaderWithBackArrow from '../navigation/back-header';
import { SubmitButton, CancelButton } from '../../styled-components/form-components';
import firebase from 'firebase';
const PaddedDiv = styled.div`
  padding: 0 5%;
`;

const CenterCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class CreateShift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      date: [],
      startTime: '',
      endTime: '',
      startRepeatDate: '',
      endRepeatDate: '',
      doesNotRepeat: false,
      color: 'Blue',
      notes: '',
      };
      console.log(this.state)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }



  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const {
      startRepeatDate, endRepeatDate, doesNotRepeat, ...shift
    } = this.state;
   // console.log(shift);
    event.preventDefault();
  }

  render() {
    const { history } = this.props;
    const {
      address, date, startTime, endTime, startRepeatDate, endRepeatDate, doesNotRepeat, color, notes,
    } = this.state;

    const colors = {
      Blue: '#7EB0B8',
      Purple: '#d0caeb',
    };

      async function createVigil() {
          // creates a new Vigil event
          const shift = new CreateShift();
          //console.log(shift.state);
          const db = firebase.firestore();
          db.collection("vigils").doc(shift.id).set({
              address: shift.state.address,
              date: '',
              startTime: '',
              endTime: '',
              startRepeatDate: '',
              endRepeatDate: '',
              doesNotRepeat: false,
              color: 'Blue',
              notes: ''
          })
              .then(() => {
                  console.log("Document successfully written!");
              })
              .catch((error) => {
                  console.error("Error writing document: ", error);
              });
        //  history.push('/'); // go back home

      }


    const colorOptions = Object.keys(colors).map((c) => <option value={c} key={c}>{c}</option>);

    return (
      <PaddedDiv>
        <HeaderWithBackArrow>Create Shift</HeaderWithBackArrow>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control name="address" value={address} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={date} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Row>
              <Col>
                <Form.Control type="time" name="startTime" value={startTime} onChange={this.handleChange} />
              </Col>

              <CenterCol xs={2} md={1}>
                <span>to</span>
              </CenterCol>

              <Col>
                <Form.Control type="time" name="endTime" value={endTime} onChange={this.handleChange} />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Label>Repeat from</Form.Label>
            <Form.Row>
              <Col>
                <Form.Control type="date" name="startRepeatDate" value={startRepeatDate} onChange={this.handleChange} disabled={doesNotRepeat} />
              </Col>

              <CenterCol xs={2} md={1}>
                <span>to</span>
              </CenterCol>

              <Col>
                <Form.Control type="date" name="endRepeatDate" value={endRepeatDate} onChange={this.handleChange} disabled={doesNotRepeat} />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Check label="Do Not Repeat" name="doesNotRepeat" value={doesNotRepeat} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Row>
              <Col>
                <Form.Control as="select" name="color" value={color} onChange={this.handleChange}>
                  {colorOptions}
                </Form.Control>
              </Col>
              <CenterCol xs="auto">
                <BsFillCircleFill color={colors[color]} size={25} />
              </CenterCol>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" name="notes" value={notes} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Col><CancelButton onClick={() => history.push('/schedule')}>Cancel</CancelButton></Col>
              <Col xs={1} />
                        <Col><SubmitButton type="submit" onClick={createVigil}>Add Shift</SubmitButton></Col>
            </Form.Row>
          </Form.Group>
        </Form>
      </PaddedDiv>
    );
  }
}

CreateShift.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(CreateShift);
