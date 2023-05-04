import { slide as Menu } from "react-burger-menu";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import "./navbar.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BiCalendarAlt,
  BiChat,
  BiPhone,
  BiLogOut,
  BiUserPlus,
} from "react-icons/bi";
import firebase from "firebase/app";
import "firebase/auth";

const SpacedDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
`;

const LinkLabel = styled.span`
  font-size: ${(props) => props.fontSize || "26px"};
  padding-left: 10px;
`;

function NavLink({ to, Icon, children, handleClick, fontSize }) {
  return (
    <Link to={to}>
      <SpacedDiv onClick={handleClick}>
        <Icon size={32} />
        <LinkLabel fontSize={fontSize}>{children}</LinkLabel>
      </SpacedDiv>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  children: PropTypes.string,
  fontSize: PropTypes.string,
  handleClick: PropTypes.func,
};

NavLink.defaultProps = {
  children: "",
  handleClick: () => {},
};

NavLink.defaultProps = {
  fontSize: "26px",
};

export default function Navbar() {
  const isAdmin = useSelector((state) => state.user.user.isAdmin);

  function signOut() {
    try {
      firebase.auth().signOut();
    } catch (err) {
      alert(`Whoops, log out did not work:\n${err}`);
    }
  }

  const signOutFunc = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Menu>
      <NavLink to="/discussion" Icon={BiChat}>
        Discussions
      </NavLink>
      <NavLink to="/schedule" Icon={BiCalendarAlt}>
        Schedule
      </NavLink>
      <NavLink to="/contacts" Icon={BiPhone}>
        Contacts
      </NavLink>
      {isAdmin ? (
        <NavLink to="/userValid" Icon={BiUserPlus} fontSize="20px">
          User Validation
        </NavLink>
      ) : null}

      <NavLink to="/login" handleClick={signOutFunc} Icon={BiLogOut}>
        Sign Out
      </NavLink>
    </Menu>
  );
}
