import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import actions from "../../../../actions";
import { selectedInfoPropType } from "../../../../dataStructures/propTypes";

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
    setShowBuffer(false);
    setShowEdit(true);
  };

  const handleEditConfirm = () => {
    console.log("pushing changes");
    closeAllModals();
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
            <p>Form here</p>
          </CenteredModal>
          <CenteredModal>
            <StyledButton centered onClick={() => handleEditConfirm()}>
              Save Changes
            </StyledButton>
            <StyledButton centered onClick={() => closeAllModals()}>
              Cancel
            </StyledButton>
          </CenteredModal>
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
