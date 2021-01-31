import React from 'react';
import PropTypes from 'prop-types';
import HeaderWithNav from './header';

export default function History(props) {
  const { isAdmin } = props;
  return (
    <div>
      <HeaderWithNav {...{ isAdmin }}>History</HeaderWithNav>
    </div>
  );
}
History.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
