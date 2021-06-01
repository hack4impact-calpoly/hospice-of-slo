import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { GreyDiv } from '../../../styled-components/discussion-components';
import Edit from './ContactOptions';

const Name = styled.span`
  font-size: 18px;
  padding-right: 30px;
  color: #424242;
  font-weight: bold;
  overflow-wrap:break-word;
  @media screen and (max-width: 768px) {
    font-size: 16px;  
  }
`;

const Email = styled.p`
  font-size: 18px;
  margin: 4px 0px 0px 0px;
  overflow-wrap:break-word;
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

const Dots = styled(Edit)`
  margin-left: auto;
  align-self: center;
`;

export default function ContactCard({
  name,
  email,
  phone,
  isAdminAccount,
  isAdmin,
  userId,
}) {
  return (
    <GreyDiv>
      <Container>
        <Row>
          <Col>
            <Name>
              {name}
              {isAdminAccount ? (<span> (Admin) </span>) : (null)}
            </Name>
            <a href={`mailto:${email}`}>
              <Email>{email}</Email>
            </a>
            <a href={`sms:+1-${phone}`}>
              <Phone>{phone}</Phone>
            </a>
          </Col>
          <Col xs={2} sm={1}>
            {isAdmin ? <Dots isAdminAccount={isAdminAccount} userId={userId} /> : (null) }
          </Col>
        </Row>
      </Container>
    </GreyDiv>
  );
}

ContactCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
