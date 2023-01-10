import React from "react";
import PropTypes from "prop-types";
import Navbar from "./navbar";
import StyledHeading from "../../styled-components/styled-heading";

export default function HeaderWithNav({ children }) {
  return (
    <div>
      <Navbar />
      <StyledHeading>{children}</StyledHeading>
    </div>
  );
}

HeaderWithNav.propTypes = {
  children: PropTypes.string.isRequired,
};
