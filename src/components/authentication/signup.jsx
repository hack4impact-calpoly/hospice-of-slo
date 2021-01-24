/* eslint-disable max-len */
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

const SubmitButton = styled.input`
  background-color: #84C0C9;
  color: white;
  text-align: center;
  width: 100%;
  justify-self: center;
  padding: 5px;
  margin-bottom: 10px;
  border: solid #84C0C9;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  width: 95%;
  border: solid #C4C4C4;
  border-radius: 5px;
`;

const StyledCol = styled(Col)`
  background-color: white;
  padding: 10px;
`;

const StyledRow = styled(Row)`
  padding: 10px;
`;

const StyledContainer = styled(Container)`
  background-color: #DCDCDC;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  padding: 10px;
`;

const ShowPassStyle = styled.div`
  display: flex;
`;

// eventually will need to be chnaged from alerts

const validatePass = (pass, rePass) => {
  if (pass !== rePass) {
    window.alert('Passwords must match');
  }
};

const validateEmail = (email) => {
  const emailFormat = /\S+@\S+\.\S+/;
  if (!emailFormat.test(email)) {
    window.alert('Please enter a valid email address');
  }
};

const validatePhone = (phone) => {
  const phoneFormat = /[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  if (!phoneFormat.test(phone)) {
    window.alert('Please enter a valid phone number');
  }
};

const validateAll = (email, phone, pass, rePass) => {
  validateEmail(email);
  validatePhone(phone);
  validatePass(pass, rePass);
};

const togglePassState = (showPass) => {
  if (showPass === 'password') {
    return 'text';
  }
  return 'password';
};

export default function SignUp() {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showPass, togglePass] = useState('password');

  return (
    <div className="m-3">
      <StyledContainer fluid>
        <StyledCol xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <form>
            <StyledRow>
              <StyledCol xs={12} md={6}>
                <h2>Create an account</h2>
                <p>Name</p>
                <StyledInput type="text" placeholder="Sally Smith" required />
              </StyledCol>
            </StyledRow>
            <StyledRow>
              <StyledCol xs={12} md={6}>
                <p>Email</p>
                <StyledInput type="text" placeholder="sallysmith@gmail.com" onBlur={() => validateEmail(email)} onChange={(x) => setEmail(email.replace(email, x.target.value))} required />
              </StyledCol>
              <StyledCol xs={12} md={6}>
                <p>Phone Number</p>
                <StyledInput type="text" placeholder="123-456-7890" onBlur={() => validatePhone(phone)} onChange={(x) => setPhone(phone.replace(phone, x.target.value))} required />
              </StyledCol>
            </StyledRow>
            <StyledRow>
              <StyledCol xs={12} md={6}>
                <p>Password</p>
                <StyledInput type={showPass} placeholder="******" onChange={(e) => setPassword(password.replace(password, e.target.value))} onBlur={(x) => validatePass(rePassword, x.target.value)} required />
              </StyledCol>
              <StyledCol xs={12} md={6}>
                <p>Re-enter Password</p>
                <StyledInput type={showPass} placeholder="******" onChange={(e) => setRePassword(rePassword.replace(rePassword, e.target.value))} onBlur={(x) => validatePass(password, x.target.value)} required />
              </StyledCol>
              <StyledCol>
                <ShowPassStyle>
                  <input type="checkbox" onChange={() => togglePass(showPass.replace(showPass, togglePassState(showPass)))} />
                  <p>Show Password</p>
                </ShowPassStyle>
                <SubmitButton type="submit" value="Create Account" onClick={() => validateAll(email, phone, password, rePassword)} />
              </StyledCol>
            </StyledRow>
          </form>
        </StyledCol>
      </StyledContainer>
    </div>
  );
}
