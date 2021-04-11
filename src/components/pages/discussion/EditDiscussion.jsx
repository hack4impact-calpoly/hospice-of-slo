import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const StyledDropdown = styled(Dropdown)`
  position: absolute;
  align-self: center;
  right: 25px;
  font-size: 20px;
`;

const StyledButton = styled.button`
  border: none;
  padding: none;
`;

export default function Edit() {
  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <StyledButton
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <a
        href={ref}
        ref={ref}
      >
        <BiDotsVerticalRounded />
      </a>
    </StyledButton>
  ));

  return (
    <StyledDropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
        <BiDotsVerticalRounded />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">pin</Dropdown.Item>
        <Dropdown.Item href="#/action-2">edit</Dropdown.Item>
        <Dropdown.Item href="#/action-3">delete</Dropdown.Item>
      </Dropdown.Menu>
    </StyledDropdown>
  );
}
