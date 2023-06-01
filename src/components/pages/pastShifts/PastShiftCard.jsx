import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GreyDiv } from "../../../styled-components/discussion-components";

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

export default function PastShiftCard({ date, time }) {
  return (
    <GreyDiv>
      <Date>{date}</Date>
      <Time>{time}</Time>
    </GreyDiv>
  );
}

PastShiftCard.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
