import React from 'react';
import styled from 'styled-components';

const StyledButtonExample = styled.button`
  background-color: #84C0C9;
  color: white;
  width: 10%;
  padding: 8px;
  border-radius: 6px;
  border: none;
`;

export default function Login() {
  return (
    <div className="m-3">
      Login Page
      <StyledButtonExample className="ml-3" onClick={() => console.log('Button Clicked')}>
        Log in
      </StyledButtonExample>
    </div>
  );
}
