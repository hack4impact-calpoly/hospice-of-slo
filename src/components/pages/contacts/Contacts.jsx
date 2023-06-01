// Root for all Things Contacts
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Row, Col, Form, Modal } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/firestore";
import HeaderWithNav from "../../navigation/nav-header";
import ContactCard from "./ContactCard";
import generateCSV from "./ContactsCsv";
import { SubmitButton } from "../../../styled-components/form-components";

const ListWrapper = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  max-width: calc(750px + 30%);
  margin: 0 auto;
`;

const StyledButton = styled(SubmitButton)`
  width: 100%;
  margin: 3px auto;
  position: relative;
  float: right;
  margin-bottom: 10px;
`;

const FormS = styled(Form.Control)`
  font-size: 18px;
  background-color: #e5e5e5;
  width: 100%;
  float: left;
`;

const StyledModal = styled(Modal)`
  background-color: rgba(0, 0, 0, 0.4);
`;

export default function Contacts() {
  // Gets User Data from redux store
  const users = useSelector((state) => state.users.users);
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  // const isValidated = useSelector((state) => state.user.user.isValidated);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function closeModal() {
    setPhone("");
    setEmail("");
    setShowModal(false);
  }

  function updateEmail() {
    if (email !== "") {
      const user = firebase.auth().currentUser;
      user
        .updateEmail(email)
        .then(() => {
          const db = firebase.firestore();
          const currentUser = sessionStorage.getItem("userid");
          db.collection("users").doc(currentUser).update({
            email,
          });
          alert(
            `Email/Username successfully updated to: ${email}! Please refresh your page to see changes`
          );
          closeModal();
          // Update successful.
        })
        .catch((error) => {
          // An error happened.
          alert(`Email/Username WAS NOT updated.${error.message}`);
        });
    }
  }

  function updatePhone() {
    // sorts in alphabetical order
    const myStr = phone.replace(/\D/g, ""); // strip all non numbers from phone number
    if (myStr.length >= 7 && myStr.length <= 13) {
      // Checks if phone is betweem 7-13 digits long
      const db = firebase.firestore();
      const currentUser = sessionStorage.getItem("userid");
      db.collection("users").doc(currentUser).update({
        phone: myStr,
      });
      alert(
        `Phone successfully updated to: ${phone}! Please refresh your page to see changes`
      );
      closeModal();
    } else {
      alert(
        "Phone WAS NOT updated. Please make sure it is in format 000-000-0000"
      );
    }
  }

  function updateName() {
    // sorts in alphabetical order
    if (name.length >= 3) {
      const db = firebase.firestore();
      const currentUser = sessionStorage.getItem("userid");
      db.collection("users").doc(currentUser).update({
        name,
      });
      alert(
        `Name successfully updated to: ${name}! Please refresh your page to see changes`
      );
      closeModal();
    } else {
      alert("Please input a longer name");
    }
  }

  return (
    <div>
      <HeaderWithNav>Contacts</HeaderWithNav>
      <ListWrapper>
        <Row>
          <Col className="search">
            <FormS
              className="mb-3"
              placeholder="search..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Col>
          <Col xs={12} sm={12} md={4}>
            <StyledButton onClick={() => setShowModal(true)}>
              Update contact info
            </StyledButton>
          </Col>
          {isAdmin ? (
            <Col xs={12} sm={12} md={2}>
              <StyledButton onClick={() => generateCSV(users)}>
                Export
              </StyledButton>
            </Col>
          ) : null}
          <StyledModal show={showModal} onHide={() => closeModal()} centered>
            <Modal.Body>
              Update Email (This will also be your new username)
              <Form.Control
                className="mt-2 mb-3"
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <StyledButton onClick={() => updateEmail()}>
                Update Email
              </StyledButton>
              <br /> <br />
              <div
                className="mt-2 mb-4"
                style={{ width: "100%", borderBottom: "2px solid #777" }}
              />
              Update Phone
              <Form.Control
                className="mt-2 mb-3"
                type="phone"
                placeholder="phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <StyledButton onClick={() => updatePhone()}>
                Update Phone
              </StyledButton>
              <br /> <br />
              <div
                className="mt-2 mb-3"
                style={{ width: "100%", borderBottom: "2px solid #777" }}
              />
              Update Name
              <Form.Control
                className="mt-2 mb-3"
                type="text"
                placeholder="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <StyledButton onClick={() => updateName()}>
                Update Name
              </StyledButton>
              <br /> <br />
              <div
                className="mt-2 mb-3"
                style={{ width: "100%", borderBottom: "2px solid #777" }}
              />
              <StyledButton onClick={() => closeModal()}>Cancel</StyledButton>
            </Modal.Body>
          </StyledModal>
        </Row>
        {users
          .filter((user) =>
            // checkAdmin(user)
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => (
            <ContactCard
              key={user.id}
              userId={user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              isAdminAccount={user.isAdminAccount}
              isAdmin={isAdmin}
              accountStatus={user.accountStatus}
              isValidated={user.isValidated}
            />
          ))}
      </ListWrapper>
    </div>
  );
}
