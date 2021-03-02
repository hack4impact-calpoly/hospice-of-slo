import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const GreyDiv = styled.div`
  background: #DDDDDD 67%;
  border-radius: 8px;
  max-width: 750px;
  width: 100%;
  padding: 10px 15px;
  margin: 10px 0;
  align-self: center;
`;

const FloatingActionButton = styled(Button)`
  border-radius: 50%;
  border: none;
  padding: 1ex 1em;
  position:fixed;
  right: 25px;
  top: 25px;
  background-color: #84C0C9;

  font-size: 20px;
  &:hover{
    background-color: #558E97;
  }
`;

export { GreyDiv, FloatingActionButton };
