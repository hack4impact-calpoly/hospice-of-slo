import { slide as Menu } from 'react-burger-menu';
import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  userIcon, scheculeIcon, discussionIcon, clipboardIcon, contactsIcon, clockIcon, signOutIcon,
} from './navbarIcons';

/* Styled Components */
const SpacedDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
`;
const LinkLabel = styled.span`
  font-size: 26px;
  padding-left: 10px;
`;

function NavLink(props) {
  const { to, icon, children } = props;
  return (
    <Link to={to}>
      <SpacedDiv>
        {icon}
        <LinkLabel>{children}</LinkLabel>
      </SpacedDiv>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  children: PropTypes.string.isRequired,
};

export default function Navbar() {
  return (
    <Menu>
      <NavLink to="/" icon={userIcon}>Name</NavLink>
      <NavLink to="/schedule" icon={scheculeIcon}>Schedule</NavLink>
      <NavLink to="/discussion" icon={discussionIcon}>Discussion</NavLink>
      <NavLink to="/past-shifts" icon={clipboardIcon}>Past Shifts</NavLink>
      <NavLink to="/contacts" icon={contactsIcon}>Contacts</NavLink>
      <NavLink to="/history" icon={clockIcon}>History</NavLink>
      <NavLink to="/" icon={signOutIcon}>SignOut</NavLink>
    </Menu>
  );
}
