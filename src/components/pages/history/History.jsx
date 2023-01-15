// Root for all Things Voulnteer History (Admin Only Page)
import React from "react";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import HeaderWithNav from "../../navigation/nav-header";
import HistoryForum from "./HistoryForum";

export default function History() {
  const storeVigils = useSelector((state) => state.vigils.vigils);

  const vigilForums = storeVigils.map((vigil) => (
    <Row key={vigil.address} className="justify-content-md-center">
      <HistoryForum title={vigil.address} />
    </Row>
  ));

  return (
    <div>
      <HeaderWithNav>Volunteer History</HeaderWithNav>
      <Container>{vigilForums}</Container>
    </div>
  );
}
