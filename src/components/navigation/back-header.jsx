import React from 'react';
import PropTypes from 'prop-types';
import { BiArrowBack } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import StyledHeading from './styled-heading';
import style from './back-header.module.css';

export default function HeaderWithBackArrow({ children }) {
  const history = useHistory();
  return (
    <div>
      <BiArrowBack onClick={() => history.goBack()} className={style.backArrow} />
      <StyledHeading>{children}</StyledHeading>
    </div>
  );
}

HeaderWithBackArrow.propTypes = {
  children: PropTypes.string.isRequired,
};
