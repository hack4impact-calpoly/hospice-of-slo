import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithNav from './header';

export default function Contacts(props) {
  const { isAd } = props;

  return (
    <div>
      <HeaderWithNav isAdmin={isAd}>Contacts</HeaderWithNav>
    </div>
  );
}

Contacts.propTypes = {
  isAd: PropTypes.bool.isRequired,
};
