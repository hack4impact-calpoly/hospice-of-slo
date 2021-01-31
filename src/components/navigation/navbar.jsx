import { slide as Menu } from 'react-burger-menu';
import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  BiUser, BiCalendarAlt, BiChat, BiClipboard, BiPhone, BiTime, BiLogOut,
} from 'react-icons/bi';
import firebase from 'firebase/app';
import 'firebase/auth';

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

export default function Navbar(props) {
  const { isAdmin } = props;
  function signOut() {
    try {
      firebase.auth().signOut();
    } catch (err) {
      alert(`Whoops, log out did not work:\n${err}`);
    }
  }

  return (
    <Menu>
      <NavLink to="/" Icon={BiUser}>Name</NavLink>
      <NavLink to="/schedule" Icon={BiCalendarAlt}>Schedule</NavLink>
      <NavLink to="/discussion" Icon={BiChat}>Discussion</NavLink>
      <NavLink to="/past-shifts" Icon={BiClipboard}>Past Shifts</NavLink>
      { isAdmin
        ? <NavLink to="/contacts" Icon={BiPhone}>Contacts</NavLink>
        : null}
      { isAdmin
        ? <NavLink to="/history" Icon={BiTime}>History</NavLink>
        : null}
      <NavLink to="/login" handleClick={signOut} Icon={BiLogOut}>Sign Out</NavLink>
    </Menu>
  );
}

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
