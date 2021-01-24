/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import confirmationIcon from '../../images/ConfirmationIcon.PNG'
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/* Sign In Button*/
const SignInButton = styled.button`
  background-color: #84C0C9;
  color: white;
  width: 30%;
  padding: 8px;
  border-radius: 6px;
  border: none;
`;

/* Successful Heading*/
const SuccessfulTitle = styled.h3`
width: 100%;
height: 20%;
font-family: Poppins;
font-style: normal;
line-height: 36px;
color: #5B5A5A;
`;

/* Confirmation Text*/
const ConfirmationText = styled.p`
width: 100%;
font-family: Poppins;
font-style: normal;
line-height: 24px;
color: #000000;
`;

/* Content Container*/
const StyledContainer = styled(Container)`
  display: flex;
  height: 100vh;
  text-align:center;
  justify-content: center;
  box-sizing: border-box;
  @media only screen and (min-width: 700px) {
    background-color: #E5E5E5;
    padding: 15vh 15vw;
  }
`;

/* Styling for Rows*/
const StyledRow = styled(Row)`
  box-sizing: border-box;
  display: flex;
  text-align: center;
  justify-content: center;
`;

/* Styling for Columns*/
const StyledColumn = styled(Col)`
  background-color: #FFFFFF;
  @media only screen and (min-width: 850px) {
    padding: 60px 5vw 70px 5vw;
  }
`;

/* Image Styling */
const StyledImage = styled(Image)`
  width:100%;
  height:100%;
  padding-top: 30%
  padding-bottom: 60%

`;

export default function SuccessPage(props) {

    return (
        <div className="successPage">
            <StyledContainer fluid>
                <StyledRow>
                    <StyledColumn md={8}>
                        <Row>
                            <StyledImage src={confirmationIcon} fluid />
                        </Row>
                         <Row>
                            <SuccessfulTitle>Successful</SuccessfulTitle>
                        </Row>
                        <Row>
                            <ConfirmationText> {props.confirmationText} </ConfirmationText>
                        </Row>
                        <Row>
                            <SignInButton onClick={() => { window.location.href = 'login'; }}>Sign In </SignInButton>
                        </Row> 
                    </StyledColumn>
                </StyledRow>
            </StyledContainer>
        </div>
    );
}
