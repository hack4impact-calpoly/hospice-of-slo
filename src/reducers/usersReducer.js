import { INITIALIZE_USERS } from "../reduxConstants/index";

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_USERS:
      console.log("Initializing Users store");
      return {
        users: [...action.users],
      };
    default:
      return state;
  }
};

export default usersReducer;
