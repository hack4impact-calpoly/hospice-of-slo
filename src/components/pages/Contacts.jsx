import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithNav from '../navigation/nav-header';

export default function Contacts(props) {
  const { isAdmin } = props;

  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Contacts</HeaderWithNav>
    </div>
  );
}

Contacts.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
