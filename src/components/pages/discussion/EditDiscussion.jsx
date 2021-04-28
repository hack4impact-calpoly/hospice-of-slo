import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import CreateThread from './createThread';
import EditHelper from './editDiscussionHelper';

const StyledDropdown = styled(Dropdown)`
  margin-left: auto;
  align-self: center;
  font-size: 30px;
`;

export default function Edit(props) {
  const { docId } = props;
  const discussions = useSelector((state) => state.discussions.discussions);
  // is there a better way to get the isPinned value?
  let discussion;
  discussions.forEach((d) => {
    if (d.id === docId) {
      discussion = d;
    }
  });

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <a
      href="."
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BiDotsVerticalRounded />
    </a>
  ));

  const handleChildClick = (ek, e) => {
    e.stopPropagation();
  };

  return (
    <StyledDropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" />

      <Dropdown.Menu>
        <Dropdown.Item
          onSelect={(ek, e) => { handleChildClick(ek, e); }}
        >
          <EditHelper discussion={discussion} isPinning />
        </Dropdown.Item>
        <Dropdown.Item
          onSelect={(ek, e) => { handleChildClick(ek, e); }}
        >
          <CreateThread discussion={discussion} isEditing />
        </Dropdown.Item>
        <Dropdown.Item
          onSelect={(ek, e) => { handleChildClick(ek, e); }}
        >
          <EditHelper discussion={discussion} isDeleting />
        </Dropdown.Item>
      </Dropdown.Menu>
    </StyledDropdown>
  );
}
