/* eslint-disable */

import React, {useState} from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Component = styled.div`
   background: #C4C4C4;
   display: flex;
   justify-content: center;
   padding: 20px;
   top: 170px;
   left: 376px;

`

export default function ResetPassword() {

   const [password, setPassword] = useState('');
   const [reenterPassword, setReenterPassword] = useState('');

   function checkPasswords() {
      if (password === reenterPassword){
         window.alert("New passwords match!");
      }

      else {
         window.alert("New passwords do not match!");
      }
   }

  return (
    <div className="m-3">
       <Component>
          <Form>
             <Form.Label>Reset Password</Form.Label>
             <Form.Group controlId="newPassword">
               <Form.Label>New Password</Form.Label>
               <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
             </Form.Group>
             <Form.Group controlId="reenterNewPassword">
               <Form.Label>Re-enter new Password</Form.Label>
               <Form.Control type="password" placeholder="Password" onChange={(e) => setReenterPassword(e.target.value)}/>
             </Form.Group>
             <Button onClick={checkPasswords} variant="primary" type="submit" block>
                Confirm
             </Button>
          </Form>
       </Component>
    </div>
  );
}
