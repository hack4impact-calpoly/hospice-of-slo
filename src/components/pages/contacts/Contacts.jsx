import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import HeaderWithNav from '../../navigation/nav-header';
import ContactCard from './ContactCard';
import generateCSV from './ContactsCsv';
import { SubmitButton } from '../../../styled-components/form-components';

const ListWrapper = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  max-width: calc(750px + 30%);
  margin: 0 auto;
`;

const ExportButton = styled(SubmitButton)`
  width: 100px;
  margin: 3px auto;
  position: relative;
  float: right;
  margin-bottom: 10px;
`;

const FormS = styled(Form.Control)`
  font-size: 18px;
  background-color: #E5E5E5;
  width: 100%;
  float: left;
`;

export default function Contacts() {
  // Gets User Data from redux store
  const users = useSelector((state) => state.users.users);
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const [searchTerm, setSearchTerm] = useState('');

  function compare(a, b) { // sorts in alphabetical order
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  return (
    <div>
      <HeaderWithNav>Contacts</HeaderWithNav>
      <ListWrapper>
        <Row>
          <Col className="search">
            <FormS
              className="mb-3"
              placeholder="search..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Col>
          {isAdmin
            ? (
              <Col xs={5} sm={3} md={2}>
                <ExportButton onClick={() => generateCSV(users)}>Export</ExportButton>
              </Col>
            )
            : null }
        </Row>
        {users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())).sort(compare).map((user) => <ContactCard key={user.id} name={user.name} email={user.email} phone={user.phone} color="#333333" />)}
      </ListWrapper>
    </div>
  );
}
