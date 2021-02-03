import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderWithNav from '../navigation/nav-header';

export default function Schedule(props) {
  const { isAdmin } = props;
  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Schedule</HeaderWithNav>
      <button type="button">
        <Link to="schedule/create-shift">Create Shift</Link>
      </button>
    </div>
  );
}

Schedule.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
