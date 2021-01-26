import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithNav from './header';

export default function PastShifts(props) {
  const { isAd } = props;
  return (
    <div>
      <HeaderWithNav isAdmin={isAd}>Past Shifts</HeaderWithNav>
    </div>
  );
}

PastShifts.propTypes = {
  isAd: PropTypes.bool.isRequired,
};
