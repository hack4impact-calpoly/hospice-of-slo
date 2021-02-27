import { INITIALIZE_USERS } from '../reduxConstants/index';

const initialState = {
  users: [],
};

const vigilReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_USERS:
      console.log('Initializing Users store');
      return {
        users: [...action.users],
      };
    default:
      return state;
  }
};

export default vigilReducer;
