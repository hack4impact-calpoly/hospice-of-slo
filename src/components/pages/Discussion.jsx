import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithNav from '../navigation/nav-header';

export default function Discussion(props) {
  const { isAdmin } = props;
  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Discussion</HeaderWithNav>
    </div>
  );
}

Discussion.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
