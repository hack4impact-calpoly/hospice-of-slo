import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import moment from "moment";
import { Modal, Form, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import actions from "../../../../actions";
import { selectedInfoPropType } from "../../../../dataStructures/propTypes";
import { combineDateAndTime } from "../createShift/CreateShiftHelper";
// import { useEffect } from "react";

const SignUpButton = styled.button`
  color: white;
  background-color: #84c0c9;
  border: 2px solid #84c0c9;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 6px 10px;
  width: 100%;
  font-size: 14px;
  fontfamily: Roboto;

  &:hover {
    color: white;
    background-color: #558e97;
  }
`;

const CenteredModal = styled(Modal.Body)`
  display: flex;
  padding: 40px;
  justify-content: space-around;
  z-index: 999;
`;

const CenteredModalAbsolute = styled(Modal.Body)`
  margin-top: 10px;
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  z-index: 998;
`;

const StyledButton = styled.button`
  color: white;
  background-color: #84c0c9;
  border: 2px solid #84c0c9;
  border-radius: 5px;
  padding: 10px 25px;
  font-size: 18px;
  fontfamily: Roboto;

  &:hover {
    color: white;
    background-color: #558e97;
  }
`;

export default function DeleteShift({ showMain, selectedInfo, setShowModal }) {
  // Redux setup
  const dispatch = useDispatch();
  const [showBuffer, setShowBuffer] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const history = useHistory();

  const [editFName, setEditFName] = useState("");
  const [editLName, setEditLName] = useState("");
  // moment(selectedInfo?.shiftStartDay).format("YYYY-MM-DD");
  const [editStartDay, setEditStartDay] = useState(
    moment(selectedInfo?.shiftStartDay).format("YYYY-MM-DD")
  );
  const [editEndDay, setEditEndDay] = useState(
    moment(selectedInfo?.shiftEndDay).format("YYYY-MM-DD")
  );
  const [editStartTime, setEditStartTime] = useState(
    moment(selectedInfo?.shiftStartTime).format("HH:mm")
  );
  const [editEndTime, setEditEndTime] = useState(
    moment(selectedInfo?.shiftEndTime).format("HH:mm")
  );

  const [delId, setDelId] = useState(selectedInfo?.shiftId);

  useEffect(() => {
    console.log("reloading delete");
    setDelId(selectedInfo?.shiftId);
    setEditStartDay(moment(selectedInfo?.shiftStartDay).format("YYYY-MM-DD"));
    setEditEndDay(moment(selectedInfo?.shiftEndDay).format("YYYY-MM-DD"));
    setEditStartTime(moment(selectedInfo?.shiftStartTime).format("HH:mm"));
    setEditEndTime(moment(selectedInfo?.shiftEndTime).format("HH:mm"));
  }, [selectedInfo]);

  async function handleDelete(id) {
    const db = firebase.firestore();

    await db.collection("shifts").doc(id).delete();
    dispatch(actions.history.deleteHistoryShift(id));

    history.push("/schedule");
  }

  function closeAllModals() {
    setShowBuffer(false);
    setShowModal(false);
    setShowEdit(false);
  }

  function handleSubmit(popup) {
    if (popup) {
      setShowModal(false);
      setShowBuffer(true);
    } else {
      handleDelete(selectedInfo.shiftId);
      closeAllModals();
    }
  }

  const handleEdit = () => {
    console.log("Editing");
    console.log(selectedInfo);
    // setDelId(selectedInfo);
    console.log(delId);
    console.log("dates and times");
    console.log(editEndDay);
    console.log(editStartDay);
    console.log(editStartTime);
    setShowBuffer(false);
    setShowEdit(true);
  };

  async function handleEditConfirm(e) {
    e.preventDefault();
    console.log("pushing changes");
    console.log(editFName);
    console.log(editLName);
    const newStart = combineDateAndTime(editStartDay, editStartTime);
    const newEnd = combineDateAndTime(editEndDay, editEndTime);

    const updatedShift = {
      startTime: newStart,
      endTime: newEnd,
      firstName: editFName,
      lastName: editLName,
    };

    console.log(updatedShift);
    console.log("UPDATED SHIFT ABOVE");

    const db = firebase.firestore();

    const doc = await db.collection("shifts").add(updatedShift);

    dispatch(actions.history.addHistoryShift({ id: doc.id, ...updatedShift }));

    await db.collection("shifts").doc(delId).delete();
    dispatch(actions.history.deleteHistoryShift(delId));

    history.push("/schedule");
    closeAllModals();
  }

  const handleEditChange = (e, setterFunc) => {
    e.preventDefault();
    setterFunc(e.target.value);
  };

  return (
    <div>
      <Modal show={showMain}>
        <Modal.Body>
          <div>
            <div>
              <strong>Volunteer Name:</strong> {selectedInfo?.volName}
            </div>
            <div>
              <strong>Shift Start:</strong> {selectedInfo?.shiftStartTime}
            </div>
            <div>
              <strong>Shift End:</strong> {selectedInfo?.shiftEndTime}
            </div>
          </div>
        </Modal.Body>
        <CenteredModal>
          <StyledButton centered onClick={() => handleSubmit(true)}>
            Delete Shift
          </StyledButton>
          <StyledButton centered onClick={() => handleEdit()}>
            Edit Shift
          </StyledButton>
          <StyledButton centered onClick={() => setShowModal(false)}>
            Close
          </StyledButton>
        </CenteredModal>
      </Modal>
      <Modal show={showBuffer}>
        <CenteredModalAbsolute>
          <h3>You sure you want to delete {selectedInfo?.volName} shift?</h3>
          <CenteredModal>
            <StyledButton centered onClick={() => closeAllModals()}>
              No
            </StyledButton>
            <StyledButton centered onClick={() => handleSubmit(false)}>
              Yes
            </StyledButton>
          </CenteredModal>
        </CenteredModalAbsolute>
      </Modal>
      <Modal show={showEdit}>
        <CenteredModalAbsolute>
          <h3>Editing shift: {selectedInfo?.volName}</h3>
          <CenteredModal>
            <Form>
              <Col>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label class="form-label">New First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="first name"
                        value={editFName}
                        onChange={(e) => handleEditChange(e, setEditFName)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {editFName === ""
                          ? "Please provide a first name "
                          : null}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label class="form-label">New Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={editLName}
                        onChange={(e) => handleEditChange(e, setEditLName)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {editLName === ""
                          ? "Please provide a last name "
                          : null}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>New Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        placeholder="yyyy/mm/dd"
                        value={editStartDay}
                        onChange={(e) => handleEditChange(e, setEditStartDay)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {editStartDay === ""
                          ? "Please provide a starting date "
                          : null}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>New End Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        placeholder="yyyy/mm/dd"
                        value={editEndDay}
                        onChange={(e) => handleEditChange(e, setEditEndDay)}
                        required
                        // ref={endDateRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {editEndDay === ""
                          ? "Please provide an ending date "
                          : null}
                        {/* {datesInverted
                          ? "End date cannot come before start date "
                          : null} */}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>New Start Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="startTime"
                        placeholder="24-hour time"
                        value={editStartTime}
                        onChange={(e) => handleEditChange(e, setEditStartTime)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {editStartTime === ""
                          ? "Please provide a starting time "
                          : null}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>New End Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="endTime"
                        placeholder="ex. 18:00"
                        value={editEndTime}
                        onChange={(e) => handleEditChange(e, setEditEndTime)}
                        required
                        // ref={endTimeRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {editEndTime === ""
                          ? "Please provide an ending time "
                          : null}
                        {/* {endsBeforeStarts
                          ? "End time cannot not come before start time "
                          : null} */}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <SignUpButton
                type="submit"
                onClick={async (e) => handleEditConfirm(e)}
              >
                Save Changes
              </SignUpButton>
              <SignUpButton onClick={() => closeAllModals()}>
                Cancel
              </SignUpButton>
            </Form>
          </CenteredModal>
          {/* <CenteredModal>
            <StyledButton centered onClick={() => handleEditConfirm()}>
              Save Changes
            </StyledButton>
            
          </CenteredModal> */}
        </CenteredModalAbsolute>
      </Modal>
    </div>
  );
}

DeleteShift.propTypes = {
  showMain: PropTypes.bool.isRequired,
  selectedInfo: selectedInfoPropType.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
