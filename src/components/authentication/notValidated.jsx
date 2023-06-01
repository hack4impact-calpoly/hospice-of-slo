import React from "react";
import styled from "styled-components";
import { Container, Col, Row } from "react-bootstrap";
import "firebase/auth";
import HeaderWithNav from "../navigation/nav-header";

const StyledDiv = styled.div`
  height: 100vh;
  background-color: #e2e2e2;
`;

const StyledRow = styled(Row)`
  width: 100vw;
  height: 100%;
  text-align: left;
  justify-content: center;
`;

const StyledContainer = styled(Container)`
  width: 100%;
  height: 100vh;
  @media only screen and (min-width: 768px) {
    height: 100vh;
    padding: 20vh 0;
  }
`;

const StyledCol = styled(Col)`
  background-color: #ffffff;
  padding: 10%;
  @media only screen and (min-width: 768px) {
    border: 2px solid #c4c4c4;
    border-radius: 5px;
    padding: 5% 10%;
    max-height: 75%;
  }
`;

export default function Discussion() {
  return (
    <StyledDiv>
      <HeaderWithNav />
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol sm={12} md={8} lg={6} xl={5}>
            <h3>Not Validated</h3>
            <p className="mt-4">
              Your account has been created. Please wait a few days for an admin
              to approve/deny your account. If you need an account urgently,
              please reach out to Hospice of SLO and ask to be approved sooner!
            </p>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    </StyledDiv>
  );
}
