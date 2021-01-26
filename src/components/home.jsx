import PropTypes from 'prop-types';
import React from 'react';
import HeaderWithNav from './pages/header';

export default function Home(props) {
  const { isAd } = props;
  return (
    <div>
      <HeaderWithNav isAdmin={isAd}>Home</HeaderWithNav>
    </div>
  );
}

Home.propTypes = {
  isAd: PropTypes.bool.isRequired,
};
