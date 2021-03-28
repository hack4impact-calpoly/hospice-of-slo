import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
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
  width: 30%;
  max-width: 125px;
padding-left: 10px;
  margin: 3px auto;
  margin-bottom: 10px;
`;
const FormS = styled(Form.Control)`
  font-size: 18px;
  background-color: #E5E5E5;
 width:40%;
  margin: 0 10px;
float: left;
  max-width: calc(750px + 30%);
`;

export default function Contacts() {
  // Gets User Data from redux store
  const users = useSelector((state) => state.users.users);
  console.log(users);
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
        <div className="search">
          <FormS
            className="mb-3"
            placeholder="search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <ExportButton onClick={() => generateCSV(users)}>Export</ExportButton>

        </div>

        {users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())).sort(compare).map((user) => <ContactCard key={user.id} name={user.name} email={user.email} phone={user.phone} color="#333333" />)}
      </ListWrapper>
    </div>
  );
}
