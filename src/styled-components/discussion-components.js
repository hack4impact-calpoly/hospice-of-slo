import styled from "styled-components";
import { Button } from "react-bootstrap";

const GreyDiv = styled.div`
  background: #dddddd 67%;
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
  position: fixed;
  right: 25px;
  top: 25px;
  background-color: #84c0c9;
  z-index: 1;

  font-size: 20px;
  &:hover {
    background-color: #558e97;
  }
`;

export { GreyDiv, FloatingActionButton };
