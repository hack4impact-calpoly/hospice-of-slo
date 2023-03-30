import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
// import firebase from "firebase/app";
import "firebase/firestore";
import { GreyDiv } from "../../../styled-components/discussion-components";
import ValidEdit from "./ValidOptions";

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

const Dots = styled(ValidEdit)`
  margin-left: auto;
  align-self: center;
`;

const ButtonBox = styled.div`
  margin-left: auto;
  margin-top: 25px;
`;

const AcceptButton = styled.button`
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

const RejectButton = styled.button`
  color: white;
  background-color: #c54b4b;
  border-radius: 5px;
  padding: 6px 10px;
  font-size: 14px;
  fontfamily: Roboto;
  margin-left: 50px;

  &:hover {
    color: white;
    background-color: #558e97;
  }
`;

export default function ValidCard({
  name,
  email,
  isValidAccount,
  isValidated,
  userId,
}) {
  // just prints user's info, id, and status
  function acceptAccount() {
    console.log(name, email, "accepted");
    console.log(userId);
  }

  function rejectAccount() {
    console.log(name, email, "rejected");
    console.log(userId);
  }

  // fix linting errors with this
  const acceptFunc = useCallback(() => {
    acceptAccount();
  }, [acceptAccount]);

  const rejectFunc = useCallback(() => {
    rejectAccount();
  }, [rejectAccount]);

  return (
    <GreyDiv>
      <Container>
        <Row>
          <Col>
            <Name>{name}</Name>
            <a href={`mailto:${email}`}>
              <Email>{email}</Email>
            </a>
          </Col>
          <Col xs={4} sm={2} md={4}>
            <div>
              <ButtonBox>
                <AcceptButton onClick={acceptFunc}>Accept</AcceptButton>
                <RejectButton onClick={rejectFunc}>Reject</RejectButton>
              </ButtonBox>
            </div>
          </Col>
          <Col xs={2} sm={1}>
            {isValidated ? (
              <Dots isValidAccount={isValidAccount} userId={userId} />
            ) : null}
          </Col>
        </Row>
      </Container>
    </GreyDiv>
  );
}

ValidCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isValidAccount: PropTypes.bool.isRequired,
  isValidated: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};
