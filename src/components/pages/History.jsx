import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithNav from './header';

export default function History(props) {
  const { isAd } = props;
  return (
    <div>
      <HeaderWithNav isAdmin={isAd}>History</HeaderWithNav>
    </div>
  );
}
History.propTypes = {
  isAd: PropTypes.bool.isRequired,
};
