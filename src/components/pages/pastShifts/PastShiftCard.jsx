import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GreyDiv } from '../../../styled-components/discussion-components';

const Address = styled.span`
  font-size: 18px;
  padding-right: 30px;
  color: #424242;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 16px;  
  }
`;

const Time = styled.p`
  font-size: 18px;
  margin: 4px 0px 0px 0px;
  @media screen and (max-width: 768px) {
    font-size: 12px;  
  }
`;

const Date = styled.p`
  font-size: 18px;
  margin: 4px 0px 0px 0px;

  @media screen and (max-width: 768px) {
    font-size: 12px;  
  }
`;

export default function PastShiftCard({
  address,
  date,
  time,
}) {
  return (
    <GreyDiv>
      <Address>{address}</Address>
      <Date>{date}</Date>
      <Time>{time}</Time>
    </GreyDiv>
  );
}

PastShiftCard.propTypes = {
  address: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
