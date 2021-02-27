import { INITIALIZE_VIGILS } from '../reduxConstants/index';

const initialState = {
  vigils: [],
};

const vigilReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_VIGILS:
      console.log('Initializing Vigils store');
      return {
        vigils: [...action.vigils],
      };
    default:
      return state;
  }
};

export default vigilReducer;
