import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/firestore";
import { GreyDiv } from "../../../styled-components/discussion-components";
import Edit from "./ContactOptions";

const Name = styled.span`
  font-size: 18px;
  padding-right: 30px;
  color: #424242;
  font-weight: bold;
  overflow-wrap: break-word;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const Email = styled.p`
  font-size: 18px;
  margin: 4px 0px 0px 0px;
  overflow-wrap: break-word;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Phone = styled.p`
  font-size: 18px;
  margin: 4px 0px 0px 0px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Dots = styled(Edit)`
  margin-left: auto;
  align-self: center;
`;

const ButtonBox = styled.div`
  margin-left: auto;
  margin-top: 25px;
`;

const ApproveButton = styled.button`
  color: white;
  background-color: #80cb7d;
  border-radius: 5px;
  padding: 6px 10px;
  font-size: 14px;
  fontfamily: Roboto;
  margin-right: 10px;

  &:hover {
    color: white;
    background-color: #558e97;
  }
`;

const DenyButton = styled.button`
  color: white;
  background-color: #c54b4b;
  border-radius: 5px;
  padding: 6px 10px;
  font-size: 14px;
  fontfamily: Roboto;

  &:hover {
    color: white;
    background-color: #558e97;
  }
`;

export default function ContactCard({
  name,
  email,
  phone,
  isAdminAccount,
  isAdmin,
  userId,
  accountStatus,
}) {
  function approveAccount() {
    const db = firebase.firestore();
    db.collection("users").doc(userId).update({
      accountStatus: "approved",
    });
    alert("Account has been approved");
  }

  function denyAccount() {
    const db = firebase.firestore();
    db.collection("users").doc(userId).update({
      accountStatus: "denied",
    });
    alert("Account has been denied");
  }
  return (
    <GreyDiv>
      <Container>
        <Row>
          <Col>
            <Name>
              {name}
              {isAdminAccount ? <span> (Admin) </span> : null}
              {accountStatus === "pending" ? (
                <span> (Pending Account) </span>
              ) : null}
            </Name>
            <a href={`mailto:${email}`}>
              <Email>{email}</Email>
            </a>
            <a href={`sms:+1-${phone}`}>
              <Phone>{phone}</Phone>
            </a>
          </Col>
          <Col xs={4} sm={2} md={4}>
            {isAdmin ? (
              <div>
                {accountStatus === "pending" ? (
                  <ButtonBox>
                    <ApproveButton onClick={approveAccount}>
                      Approve
                    </ApproveButton>
                    <DenyButton onClick={denyAccount}>Deny</DenyButton>
                  </ButtonBox>
                ) : null}
              </div>
            ) : null}
          </Col>
          <Col xs={2} sm={1}>
            {isAdmin ? (
              <Dots isAdminAccount={isAdminAccount} userId={userId} />
            ) : null}
          </Col>
        </Row>
      </Container>
    </GreyDiv>
  );
}

ContactCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
