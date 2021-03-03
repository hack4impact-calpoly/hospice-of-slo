import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GreyDiv } from '../../../styled-components/discussion-components';

const Name = styled.span`
  font-size: 18px;
  padding-right: 30px;
  color: #424242;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 16px;  
  }
`;

const Email = styled.p`
  font-size: 18px;
  margin: 4px 0px 0px 0px;
  @media screen and (max-width: 768px) {
    font-size: 12px;  
  }
`;

const Phone = styled.p`
  font-size: 18px;
  margin: 4px 0px 0px 0px;

  @media screen and (max-width: 768px) {
    font-size: 12px;  
  }
`;

export default function ContactCard({
  name,
  email,
  phone,
}) {
  return (
    <GreyDiv>
      <Name>{name}</Name>
      <Email>{email}</Email>
      <Phone>{phone}</Phone>
    </GreyDiv>
  );
}

ContactCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
