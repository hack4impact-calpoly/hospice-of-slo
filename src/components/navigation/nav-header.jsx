import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './navbar';
import StyledHeading from '../../styled-components/styled-heading';

export default function HeaderWithNav({ isAdmin, children }) {
  return (
    <div>
      <Navbar {...{ isAdmin }} />
      <StyledHeading>{children}</StyledHeading>
    </div>
  );
}

HeaderWithNav.propTypes = {
  children: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
