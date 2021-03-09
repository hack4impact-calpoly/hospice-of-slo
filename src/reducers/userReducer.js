import { INITIALIZE_USER } from '../reduxConstants/index';

const initialState = {
  user: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_USER:
      console.log('Initializing User store');
      return {
        user: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
