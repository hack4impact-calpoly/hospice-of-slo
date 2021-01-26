import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithNav from './header';

export default function Discussion(props) {
  const { isAd } = props;
  return (
    <div>
      <HeaderWithNav isAdmin={isAd}>Discussion</HeaderWithNav>
    </div>
  );
}

Discussion.propTypes = {
  isAd: PropTypes.bool.isRequired,
};
