import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithNav from './header';

export default function Schedule(props) {
  const { isAdmin } = props;
  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Schedule</HeaderWithNav>
    </div>
  );
}

Schedule.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
