/* eslint-disable no-param-reassign */
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import moment from "moment";
import HeaderWithNav from "../../navigation/nav-header";
import { SubmitButton } from "../../../styled-components/form-components";
import generateCSV from "./HistoryCsv";

const ExportButton = styled(SubmitButton)`
  width: 100px;
  margin: 3px auto;
  position: relative;
  float: right;
  margin-bottom: 10px;
`;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: flex-end;
`;

const StyledCol = styled(Col)`
  padding: 3%;
  justify-content: center;
  text-align: center;
  fontweight: bold;
`;

export default function HistoryTable() {
  const { id } = useParams();
  const storeHistory = useSelector(
    (state) => state.historyShifts.historyShifts
  );

  const dateOptions = { month: "numeric", day: "numeric", year: "2-digit" };
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  const vigilHistory = [];
  storeHistory.forEach((shift) => {
    if (shift.address.includes(id) && !shift.isAdmin) {
      // Adding new field to JSON Objects to make calculating/retrieving dates & time easier
      shift.shiftDate = `${shift.shiftStartTime
        .toDate()
        .toLocaleDateString(undefined, dateOptions)}`;
      shift.startTime = `${shift.shiftStartTime
        .toDate()
        .toLocaleTimeString(undefined, timeOptions)}`;
      shift.endTime = `${shift.shiftEndTime
        .toDate()
        .toLocaleTimeString(undefined, timeOptions)}`;
      shift.duration = `${moment(shift.shiftEndTime.toDate()).diff(
        moment(shift.shiftStartTime.toDate()),
        "hours"
      )}`;
      // Acceptable to add fields to JSON Object data? we are just this JSON Object to make the CSV file, esLint does not like this.
      vigilHistory.push(shift);
    }
  });

  function aRow(col1, col2, col3, col4, color) {
    return (
      <StyledRow
        key={col4}
        style={{ background: color }}
        className="justify-content-md-center"
      >
        <StyledCol>{col1}</StyledCol>
        <StyledCol>{col2}</StyledCol>
        <StyledCol>{col3}</StyledCol>
        <StyledCol>{col4}</StyledCol>
      </StyledRow>
    );
  }

  const table = [aRow("Name", "Vigil", "Date", "Time", "#C4C4C4")];

  vigilHistory.forEach((r) => {
    const timePer = `${r.shiftStartTime
      .toDate()
      .toLocaleTimeString(undefined, timeOptions)} 
        to ${r.shiftEndTime
          .toDate()
          .toLocaleTimeString(undefined, timeOptions)}`;
    const shiftDate = `${r.shiftStartTime
      .toDate()
      .toLocaleDateString(undefined, dateOptions)}`;

    table.push(aRow(r.name, r.address, shiftDate, timePer, "#DCDCDC"));
  });

  return (
    <div>
      <HeaderWithNav>{id}</HeaderWithNav>
      <Container>
        <Row>
          <Col />
          {table.length > 1 ? (
            <ExportButton onClick={() => generateCSV(vigilHistory)}>
              Export
            </ExportButton>
          ) : null}
        </Row>
        {table.length > 1 ? table : "This vigil has no shift history."}
      </Container>
    </div>
  );
}
