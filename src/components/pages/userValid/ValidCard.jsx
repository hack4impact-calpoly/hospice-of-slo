import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Row, Col, Modal } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/firestore";
import { GreyDiv } from "../../../styled-components/discussion-components";

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

export default function ValidCard({ name, email, isValidAccount, userId }) {
  const [showValid, setShowValid] = useState(false);
  const [showReject, setShowReject] = useState(false);

  // accept user here
  function acceptAccount() {
    const db = firebase.firestore();
    db.collection("users")
      .doc(userId)
      .update({
        isValidated: true,
      })
      .then(() => {
        setShowValid(false);
      });
  }

  // reject user here
  function rejectAccount() {
    const db = firebase.firestore();
    db.collection("users")
      .doc(userId)
      .delete({
        isValidated: !isValidAccount,
      })
      .then(() => {
        setShowReject(false);
      });
  }

  // Modal popup functions for accept and reject users
  const acceptFunc = useCallback(() => {
    acceptAccount();
    setTimeout(() => {
      setShowValid(false);
    }, 100);
  }, [acceptAccount]);

  const rejectFunc = useCallback(() => {
    rejectAccount();
    setTimeout(() => {
      setShowReject(false);
    }, 100);
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
                <AcceptButton onClick={() => setShowValid(true)}>
                  Accept
                </AcceptButton>
                <StyledModal
                  show={showValid}
                  onHide={() => setShowValid(false)}
                  centered
                >
                  <Modal.Body>
                    <span>
                      <p>
                        <b>Are you sure that you want to ACCEPT this user?</b>
                        Refresh the page for changes once <b>Ok</b> is pressed
                      </p>
                    </span>
                  </Modal.Body>
                  <Modal.Footer>
                    <StyledButton onClick={() => setShowValid(false)}>
                      Cancel
                    </StyledButton>
                    <StyledButton onClick={() => acceptFunc()}>Ok</StyledButton>
                  </Modal.Footer>
                </StyledModal>
                <RejectButton onClick={() => setShowReject(true)}>
                  Reject
                </RejectButton>
                <StyledModal
                  show={showReject}
                  onHide={() => setShowReject(false)}
                  centered
                >
                  <Modal.Body>
                    <span>
                      <b>Are you sure that you want to REJECT this user?</b>This
                      action can <b>NOT</b> be revoked. Refresh the page for
                      changes once <b>REJECT USER</b> is pressed
                    </span>
                    <br />
                  </Modal.Body>
                  <Modal.Footer>
                    <StyledButton onClick={() => setShowReject(false)}>
                      Cancel
                    </StyledButton>
                    <StyledButton onClick={() => rejectFunc()}>
                      REJECT USER
                    </StyledButton>
                  </Modal.Footer>
                </StyledModal>
              </ButtonBox>
            </div>
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
  userId: PropTypes.string.isRequired,
};
