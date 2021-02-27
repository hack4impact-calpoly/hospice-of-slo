import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import HeaderWithNav from '../navigation/nav-header';

export default function Contacts(props) {
  const { isAdmin } = props;

  // Gets User Data from redux store
  const storeUsers = useSelector((state) => state.users.users);
  console.log(storeUsers);

  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Contacts</HeaderWithNav>
    </div>
  );
}

Contacts.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
