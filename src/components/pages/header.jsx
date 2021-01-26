import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../navigation/navbar';

const StyledHeading = styled.h2`
  text-align: center;
  padding-top: 32px;
`;

export default function HeaderWithNav(props) {
  const { isAdmin, children } = props;

  return (
    <div>
      <Navbar isAd={isAdmin} />
      <StyledHeading>{children}</StyledHeading>
    </div>
  );
}

HeaderWithNav.propTypes = {
  children: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
