import React from 'react';
import styled from 'styled-components';
import {
  Container, Row, Col, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import successImage from '../../images/Success.png';

const StyledDiv = styled.div`
  height: 100vh;
  background-color: #E2E2E2;
`;

const StyledContainer = styled(Container)`
  width: 100%;
  height: 100vh;
  @media only screen and (min-width: 768px) {
    height: 100vh;
    padding: 20vh 0;
  }
`;

const StyledRow = styled(Row)`
  width: 100vw;
  height: 100%;
  text-align: center;
  justify-content: center;
`;

const StyledCol = styled(Col)`
  background-color: #FFFFFF;
  padding: 10%;
  text-align: center;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 768px) {
    border: 2px solid #C4C4C4;
    border-radius: 5px;
    padding: 5% 10%
  }
`;

const SignInButton = styled.button`
  background-color: #84C0C9;
  color: white;
  width: 30%;
  padding: 8px;
  border-radius: 6px;
  border: none;
`;

const StyledImage = styled(Image)`
  width: 15%;
`;

const SuccessfulTitle = styled.h3`
  color: #5B5A5A;
`;

export default function Success(props) {
  const { // Bool: true if came from Create Account, false if came from reset password
    cameFromAccount,
  } = props;
  // you would call this function from app.js like:
  // <SuccessPage cameFromAccount={false}/>

  return (
    <StyledDiv>
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol sm={12} md={8} lg={6}>
            <StyledImage src={successImage} className="mt-4" />
            <SuccessfulTitle className="mt-3">
              Successful
            </SuccessfulTitle>
            {cameFromAccount
              ? (
                <p className="mt-3">
                  You have successfully registered. Click the button below to sign in!
                </p>
              )
              : (
                <p className="mt-3">
                  You have successfully reset your password. An email confirmation has been sent!
                </p>
              )}
            <SignInButton onClick={() => { window.location.href = 'login'; }}>Sign In </SignInButton>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    </StyledDiv>
  );
}

Success.propTypes = {
  cameFromAccount: PropTypes.bool,
};

Success.defaultProps = {
  cameFromAccount: false,
};
