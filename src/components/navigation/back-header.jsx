import React from 'react';
import PropTypes from 'prop-types';
import { BiArrowBack } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import StyledHeading from './styled-heading';

const BackButton = styled(BiArrowBack)`
  position: fixed;
  width: 40px;
  height: 40px;
  left: 30px;
  top: 32px;
  cursor: pointer;
`;

export default function HeaderWithBackArrow({ children }) {
  const history = useHistory();
  return (
    <div>
      <BackButton onClick={() => history.goBack()} />
      <StyledHeading>{children}</StyledHeading>
    </div>
  );
}

HeaderWithBackArrow.propTypes = {
  children: PropTypes.string.isRequired,
};
