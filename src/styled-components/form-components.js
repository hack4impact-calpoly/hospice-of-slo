import styled from 'styled-components';

const SubmitButton = styled.button`
  color: white;
  background-color: #84C0C9;
  border: none; 
  border-radius: 6px;
  width: 100%;
  height: 33px;
  font-size: 14px;

  &:hover{
    background-color: #558E97;
  }
  
  &:disabled{
    color: darkgrey;
    background-color: lightgrey;
  }
`;

const CancelButton = styled.button`
  color: #558E97;
  background-color: transparent;
  border: 1px solid #558E97;
  border-radius: 6px;
  width: 100%;
  height: 33px;
  font-size: 14px;

  &:hover{
    background-color: lightgrey;
  }
`;

export { SubmitButton, CancelButton };
