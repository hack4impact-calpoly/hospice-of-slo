import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import 'firebase/auth';

const StyledDiv = styled.div`
  height: 100vh;
  background-color: #E2E2E2;
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
  background-color: #FFFFFF;
  padding: 10%;
  @media only screen and (min-width: 768px) {
    border: 2px solid #C4C4C4;
    border-radius: 5px;
    padding: 5% 10%;
    max-height: 65%
  }
`;

export default function Discussion() {
  return (
    <StyledDiv>
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol sm={12} md={8} lg={6} xl={5}>
            <h3>Not Validated</h3>
            <p className="mt-4">You are not a validated user. An email has been sent to your administrator to validate. Please try again later and contact your administrator about any problems!</p>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    </StyledDiv>
  );
}