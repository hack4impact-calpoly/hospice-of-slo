import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Modal,
} from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';

const StyledDropdown = styled(Dropdown)`
  top: 20%;
  font-size: 30px;
`;

const StyledModal = styled(Modal)`
  background-color: rgba(0,0,0,0.3);
`;

const StyledButton = styled.button`
color: white;
background-color: #84C0C9;
border: 2px solid #84C0C9;
border-radius: 5px;
padding: 6px 10px; 
font-size: 14px;
fontFamily: Roboto;

&:hover{
  color: white;
  background-color: #558E97;
}
`;

export default function Edit(props) {
  const { isAdminAccount, userId } = props;
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

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

  function toggleAdmin() {
    const db = firebase.firestore();
    db.collection('users').doc(userId).update({
      isAdmin: !isAdminAccount,
    }).then(() => {
      alert('SUCCESS! Admin Priveleges have been modified! Refresh page to see changes');
      setShowAdminModal(false);
    });
  }

  function deleteAccount() {
    const db = firebase.firestore();
    db.collection('users').doc(userId).update({
      accountStatus: 'denied',
    });
    alert('SUCCESS! User has been Deleted. Refresh page to see changes');
    setShowDeleteAccountModal(false);
  }

  return (
    <>
      <StyledModal show={showAdminModal} onHide={() => setShowAdminModal(false)} centered>
        <Modal.Body>
          {isAdminAccount
            ? <p> Are you sure that you want to revoke Admin privileges from this account? </p>
            : <p> Are you sure that you want to give Admin privileges from this account? </p>}
        </Modal.Body>
        <Modal.Footer>
          <StyledButton onClick={() => setShowAdminModal(false)}>Cancel</StyledButton>
          <StyledButton onClick={() => toggleAdmin()}>Ok</StyledButton>
        </Modal.Footer>
      </StyledModal>
      <StyledModal show={showDeleteAccountModal} onHide={() => setShowDeleteAccountModal(false)} centered>
        <Modal.Body>
          <span> Are you sure that you want to delete this account? This action can NOT be revoked. </span>
          <br />
          <span style={{ color: 'red' }}> WARNING: if you delete an account, you will not be create a new account with the same email for 30 days. </span>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton onClick={() => setShowDeleteAccountModal(false)}>Cancel</StyledButton>
          <StyledButton onClick={() => deleteAccount()}>DELETE ACCOUNT</StyledButton>
        </Modal.Footer>
      </StyledModal>
      <StyledDropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" />
        <Dropdown.Menu>
          <Dropdown.Item
            onSelect={() => setShowAdminModal(true)}
          >
            {isAdminAccount
              ? <p> Revoke Admin </p>
              : <p> Make Admin </p>}
          </Dropdown.Item>
          <Dropdown.Item
            onSelect={() => setShowDeleteAccountModal(true)}
          >
            <p> Delete Account </p>
          </Dropdown.Item>
        </Dropdown.Menu>
      </StyledDropdown>
    </>
  );
}
