import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/firestore";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Dropdown from "react-bootstrap/Dropdown";

const StyledDropdown = styled(Dropdown)`
  top: 20%;
  font-size: 30px;
`;

const StyledModal = styled(Modal)`
  background-color: rgba(0, 0, 0, 0.3);
`;

const StyledButton = styled.button`
  color: white;
  background-color: #84c0c9;
  border: 2px solid #84c0c9;
  border-radius: 5px;
  padding: 6px 10px;
  font-size: 14px;
  fontfamily: Roboto;

  &:hover {
    color: white;
    background-color: #558e97;
  }
`;

// for later functionality of the buttons
export default function ValidEdit(props) {
  const { isValidAccount, userId } = props;
  const [showValidModal, setShowValidModal] = useState(false);
  const [showRejectAccountModal, setShowRejectAccountModal] = useState(false);

  /* eslint react/prop-types: 0 */
  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <a
      href="."
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BiDotsVerticalRounded />
    </a>
  ));
  // accept user here
  function toggleValid() {
    const db = firebase.firestore();
    db.collection("users")
      .doc(userId)
      .update({
        isValidated: !isValidAccount,
      })
      .then(() => {
        alert("SUCCESS! User has been Accepted! Refresh page to see changes");
        setShowValidModal(false);
      });
  }

  // reject user here
  function rejectAccount() {
    const db = firebase.firestore();
    db.collection("users").doc(userId).update({
      accountStatus: "denied",
    });
    alert("SUCCESS! User has been Rejected. Refresh page to see changes");
    setShowRejectAccountModal(false);
  }

  return (
    <>
      <StyledModal
        show={showValidModal}
        onHide={() => setShowValidModal(false)}
        centered
      >
        <Modal.Body>
          {isValidAccount ? (
            <p>Are you sure that you want to reject this user?</p>
          ) : (
            <p>Are you sure that you want to accept this user?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <StyledButton onClick={() => setShowValidModal(false)}>
            Cancel
          </StyledButton>
          <StyledButton onClick={() => toggleValid()}>Ok</StyledButton>
        </Modal.Footer>
      </StyledModal>
      <StyledModal
        show={showRejectAccountModal}
        onHide={() => setShowRejectAccountModal(false)}
        centered
      >
        <Modal.Body>
          <span>
            Are you sure that you want to reject this user? This action can NOT
            be revoked.
          </span>
          <br />
          <span style={{ color: "red" }}>
            {" "}
            WARNING: if you delete an account, you will not be create a new
            account with the same email for 30 days.{" "}
          </span>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton onClick={() => setShowRejectAccountModal(false)}>
            Cancel
          </StyledButton>
          <StyledButton onClick={() => rejectAccount()}>
            REJECT USER
          </StyledButton>
        </Modal.Footer>
      </StyledModal>
      <StyledDropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" />
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => setShowValidModal(true)}>
            {isValidAccount ? <p> Reject User </p> : <p> Accept User </p>}
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => setShowRejectAccountModal(true)}>
            <p> Reject User </p>
          </Dropdown.Item>
        </Dropdown.Menu>
      </StyledDropdown>
    </>
  );
}

ValidEdit.propTypes = {
  userId: PropTypes.string.isRequired,
  isValidAccount: PropTypes.bool.isRequired,
};
