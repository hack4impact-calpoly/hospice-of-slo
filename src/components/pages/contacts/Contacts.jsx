/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import HeaderWithNav from '../../navigation/nav-header';
import ContactCard from './ContactCard';
import generateCSV from './ContactsCsv';
import { SubmitButton } from '../../../styled-components/form-components';
import {
    Row, Col, Button, Modal, Form,
} from 'react-bootstrap';
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
            <div style={{ textAlign: 'center', paddingTop: '30vh' }}>
                <Form.Control
                    className="mb-3" placeholder={"Enter name here"} onChange={(e) => {
                    setSearchTerm(e.target.value);
                    console.log(searchTerm);
                }} placeholder='Search for a name!' />
                <br></br>
                </div>
            <ListWrapper>
                <ExportButton onClick={() => generateCSV(users)}>Export</ExportButton>
                {users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).sort(compare).map((user) => <ContactCard key={user.id} name={user.name} email={user.email} phone={user.phone} color="#333333" />)}
            </ListWrapper>
        </div>
    );
}