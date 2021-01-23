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
  border: #84C0C9;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  width: 200px;
  border-radius: 5px;
  border-color: #DCDCDC;
`;

const StyledCol = styled(Col)`
  background-color: white;
  border-radius: 5px;
  
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
        <StyledCol sm={{ span: 6, offset: 3 }}>
          <h2>Create an account</h2>
          <form>
            <StyledRow>
              <StyledCol sm={6}>
                <p>Name</p>
                <StyledInput type="text" placeholder="Sally Smith" required />
              </StyledCol>
            </StyledRow>
            <StyledRow>
              <StyledCol>
                <p>Email</p>
                <StyledInput type="text" placeholder="sallysmith@gmail.com" onBlur={() => validateEmail(email)} onChange={(x) => setEmail(email.replace(email, x.target.value))} required />
              </StyledCol>
              <StyledCol>
                <p>Phone Number</p>
                <StyledInput type="text" placeholder="123-456-7890" onBlur={() => validatePhone(phone)} onChange={(x) => setPhone(phone.replace(phone, x.target.value))} required />
              </StyledCol>
            </StyledRow>
            <StyledRow>
              <StyledCol>
                <p>Password</p>
                <StyledInput type={showPass} placeholder="******" onChange={(e) => setPassword(password.replace(password, e.target.value))} onBlur={(x) => validatePass(rePassword, x.target.value)} required />
              </StyledCol>
              <StyledCol>
                <p>Re-enter Password</p>
                <StyledInput type={showPass} placeholder="******" onChange={(e) => setRePassword(rePassword.replace(rePassword, e.target.value))} onBlur={(x) => validatePass(password, x.target.value)} required />
              </StyledCol>
            </StyledRow>
            <input type="checkbox" onChange={() => togglePass(showPass.replace(showPass, togglePassState(showPass)))} />
            <p>Show Password</p>
            <SubmitButton type="submit" value="Create Account" onClick={() => validateAll(email, phone, password, rePassword)} />
          </form>
        </StyledCol>
      </StyledContainer>
    </div>
  );
}
