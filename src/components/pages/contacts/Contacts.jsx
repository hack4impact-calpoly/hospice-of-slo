import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import HeaderWithNav from '../../navigation/nav-header';
import ContactCard from './ContactCard';

const ListWrapper = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
`;

export default function Contacts() {
  // Gets User Data from redux store
  const users = useSelector((state) => state.users.users);
  console.log(users);

  return (
    <div>
      <HeaderWithNav>Contacts</HeaderWithNav>
      <ListWrapper>
        {users.map((user) => <ContactCard key={user.id} name={user.name} email={user.email} phone={user.phone} color="#333333" />)}
      </ListWrapper>
    </div>
  );
}
