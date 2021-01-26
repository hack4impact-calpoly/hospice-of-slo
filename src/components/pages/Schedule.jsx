import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithNav from './header';

export default function Schedule(props) {
  const { isAd } = props;
  return (
    <div>
      <HeaderWithNav isAdmin={isAd}>Schedule</HeaderWithNav>
    </div>
  );
}

Schedule.propTypes = {
  isAd: PropTypes.bool.isRequired,
};
