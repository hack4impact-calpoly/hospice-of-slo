import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithNav from './header';

export default function PastShifts(props) {
  const { isAdmin } = props;
  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Past Shifts</HeaderWithNav>
    </div>
  );
}

PastShifts.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
