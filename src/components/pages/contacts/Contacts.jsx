import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
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
  align-self: flex-end;
  margin-bottom: 10px;
`;

export default function Contacts() {
  // Gets User Data from redux store
  const users = useSelector((state) => state.users.users);
  console.log(users);

  return (
    <div>
      <HeaderWithNav>Contacts</HeaderWithNav>
      <ListWrapper>
        <ExportButton onClick={() => generateCSV(users)}>Export</ExportButton>
        {users.map((user) => <ContactCard key={user.id} name={user.name} email={user.email} phone={user.phone} color="#333333" />)}
      </ListWrapper>
    </div>
  );
}
