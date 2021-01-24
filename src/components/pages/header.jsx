import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../navigation/navbar';

const StyledHeading = styled.h2`
  text-align: center;
  padding-top: 32px;
`;

export default function HeaderWithNav(props) {
  const { children } = props;
  return (
    <div>
      <Navbar />
      <StyledHeading>{children}</StyledHeading>
    </div>
  );
}

HeaderWithNav.propTypes = { children: PropTypes.string.isRequired };
