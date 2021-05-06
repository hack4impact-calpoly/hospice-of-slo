import { INITIALIZE_USER, ADD_SHIFT, DELETE_SHIFT } from '../reduxConstants/index';

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
    case ADD_SHIFT: {
      const userCopy = { ...state.user };
      userCopy.prevShifts.push(action.payload.newShift);
      return { user: userCopy };
    }
    case DELETE_SHIFT: {
      const userCopy = { ...state.user };
      const shiftsCopy = state.user.prevShifts.filter((d) => d.id !== action.payload.oldShiftId);
      userCopy.prevShifts = shiftsCopy;
      return { user: userCopy };
    }
    default:
      return state;
  }
};

export default userReducer;
