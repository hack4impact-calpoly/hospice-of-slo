import PropTypes from 'prop-types';
import React from 'react';
import HeaderWithNav from './navigation/nav-header';

export default function Home(props) {
  const { isAdmin } = props;
  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>Home</HeaderWithNav>
    </div>
  );
}

Home.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
