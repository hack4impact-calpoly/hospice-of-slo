import { slide as Menu } from 'react-burger-menu';
import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CalendarBlank from './icons/CalendarBlank.svg';
import ChatsCircle from './icons/ChatsCircle.svg';
import ClipboardText from './icons/ClipboardText.svg';
import Clock from './icons/Clock.svg';
import Phone from './icons/Phone.svg';
import SignOut from './icons/SignOut.svg';
import User from './icons/User.svg';

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

function NavLink(props) {
  const { to, icon, children } = props;
  return (
    <Link to={to}>
      <SpacedDiv>
        <img src={icon} alt="" />
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
      <NavLink to="/" icon={User}>Name</NavLink>
      <NavLink to="/schedule" icon={CalendarBlank}>Schedule</NavLink>
      <NavLink to="/discussion" icon={ChatsCircle}>Discussion</NavLink>
      <NavLink to="/past-shifts" icon={ClipboardText}>Past Shifts</NavLink>
      <NavLink to="/contacts" icon={Phone}>Contacts</NavLink>
      <NavLink to="/history" icon={Clock}>History</NavLink>
      <NavLink to="/" icon={SignOut}>SignOut</NavLink>
    </Menu>
  );
}
