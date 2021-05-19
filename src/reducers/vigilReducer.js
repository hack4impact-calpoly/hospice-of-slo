import {
  INITIALIZE_VIGILS, ADD_VIGIL, EDIT_VIGIL, DELETE_VIGIL,
} from '../reduxConstants/index';

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
    case ADD_VIGIL: {
      const vigilsCopy = [...state.vigils];
      vigilsCopy.push(action.payload.newVigil);
      return { vigils: vigilsCopy };
    }
    case EDIT_VIGIL: {
      const vigilsCopy = state.vigils.filter((v) => v.id !== action.payload.oldVigilId);
      vigilsCopy.push(action.payload.newVigil);
      return { vigils: vigilsCopy };
    }
    case DELETE_VIGIL: {
      const vigilsCopy = state.vigils.filter((v) => v.id !== action.payload.oldVigilId);
      return { vigils: vigilsCopy };
    }
    default:
      return state;
  }
};

export default vigilReducer;
