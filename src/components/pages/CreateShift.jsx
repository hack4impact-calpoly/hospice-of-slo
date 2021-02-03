import React from 'react';
import HeaderWithBackArrow from '../navigation/back-header';

export default class CreateShift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <HeaderWithBackArrow>Create Shift</HeaderWithBackArrow>
      </div>
    );
  }
}
