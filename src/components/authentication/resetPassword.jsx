/* eslint-disable */

import React from 'react';
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
  return (
    <div className="m-3">
       <Component>
          <Form>
             <Form.Label>Reset Password</Form.Label>
             <Form.Group controlId="newPassword">
               <Form.Label>New Password</Form.Label>
               <Form.Control type="password" placeholder="Password" />
             </Form.Group>
             <Form.Group controlId="reenterNewPassword">
               <Form.Label>Re-enter new Password</Form.Label>
               <Form.Control type="password" placeholder="Password" />
             </Form.Group>
             <Button variant="primary" type="submit" block>
                Confirm
             </Button>
          </Form>
       </Component>
    </div>
  );
}
