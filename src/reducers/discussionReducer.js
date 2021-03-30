import { INITIALIZE_DISCUSSIONS } from '../reduxConstants/index';

const initialState = {
  discussions: [],
};

const discussionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_DISCUSSIONS:
      console.log('Initializing Discussion store');
      return {
        discussions: action.discussions,
      };
    default:
      return state;
  }
};

export default discussionsReducer;
