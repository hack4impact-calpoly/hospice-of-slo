// Root for all Things userValid
import React from "react";
import { useSelector } from "react-redux";
import "firebase/firestore";
import styled from "styled-components";
import HeaderWithNav from "../../navigation/nav-header";
import ValidCard from "./ValidCard";

const ListWrapper = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  max-width: calc(750px + 30%);
  margin: 0 auto;
`;

const StyledP = styled.p`
  display: flex;
  align-self: center;
  margin-top: 50px;
  font-size: 20px;
`;

export default function Valid() {
  // Gets user data from redux store
  const users = useSelector((state) => state.users.users);

  // Filtering function to get non validated users for admins to see
  function checkValid(user) {
    if (user.isValidAccount === false) {
      return true;
    }
    return false;
  }

  const notValidUsers = users
    .filter((user) => checkValid(user))
    .map((user) => (
      <ValidCard
        key={user.id}
        userId={user.id}
        name={user.name}
        email={user.email}
        isValidAccount={user.isValidAccount}
        isValidated={user.isValidAccount}
      />
    ));

  return (
    <div>
      <HeaderWithNav>User Validation</HeaderWithNav>
      <ListWrapper>
        {notValidUsers.length === 0 ? (
          <StyledP>No users pending validation.</StyledP>
        ) : (
          notValidUsers
        )}
      </ListWrapper>
    </div>
  );
}
