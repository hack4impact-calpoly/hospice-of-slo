import React, { useState } from 'react';
import styled from 'styled-components';

const SendButton = styled.button`
  background-color: #84C0C9;
  color: #FFFFFF;
  width: 10%;
  padding: 8px;
  justify-self: center;
  border-radius: 6px;
  border: none;
`;

const StyledInput = styled.input`
  border: 1px solid #C4C4C4;
  box-sizing: border-box;
  border-radius: 6px;
`;

const Grid = styled.div`
`;

const Row = styled.div`
  display: flex;
`;

// const Col = styled.div`
//   flex: ${(props) => props.size};
// `;

const validateEmail = (email) => {
  const emailFormat = /\S+@\S+\.\S+/;
  if (!emailFormat.test(email)) { // eslint-disable-next-line
    window.alert('Valid email required.');
  }
};

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  return (
    <div className="m-3">
      <h1 style={{ fontSize: 20 }}>Forgot Password</h1>
      <Grid>
        <Row style={{ fontSize: 13 }}>Email</Row>
        <Row><StyledInput type="text" placeholder="sallysmith@gmail.com" onBlur={() => validateEmail(email)} onChange={(x) => setEmail(email.replace(email, x.target.value))} required /></Row>
        <Row><SendButton type="submit" value="Send" onClick={() => validateEmail(email)} /></Row>
      </Grid>
    </div>
  );
}
