import { slide as Menu } from 'react-burger-menu';
import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  BiUser, BiCalendarAlt, BiChat, BiClipboard, BiPhone, BiTime, BiLogOut,
} from 'react-icons/bi';

/* Styled Components */
const SpacedDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
`;
const LinkLabel = styled.span`
  font-size: 26px;
  padding-left: 10px;
`;

function NavLink({
  to, Icon, children, handleClick,
}) {
  return (
    <Link to={to}>
      <SpacedDiv onClick={handleClick}>
        <Icon size={32} />
        <LinkLabel>{children}</LinkLabel>
      </SpacedDiv>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

NavLink.defaultProps = {
  handleClick: () => {},
};

export default function Navbar() {
  return (
    <Menu>
      <NavLink to="/" Icon={BiUser}>Name</NavLink>
      <NavLink to="/schedule" Icon={BiCalendarAlt}>Schedule</NavLink>
      <NavLink to="/discussion" Icon={BiChat}>Discussion</NavLink>
      <NavLink to="/past-shifts" Icon={BiClipboard}>Past Shifts</NavLink>
      <NavLink to="/contacts" Icon={BiPhone}>Contacts</NavLink>
      <NavLink to="/history" Icon={BiTime}>History</NavLink>
      <NavLink to="/" handleClick={() => console.log('fixed!')} Icon={BiLogOut}>SignOut</NavLink>
    </Menu>
  );
}
