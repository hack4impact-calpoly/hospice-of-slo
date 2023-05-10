import {
  INITIALIZE_SHIFTS,
  ADD_SHIFT,
  EDIT_SHIFT,
  DELETE_SHIFT,
} from "../reduxConstants/index";

const initialState = {
  shifts: [],
};

const shiftReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SHIFTS:
      console.log("Initializing Shifts store");
      return {
        shifts: [...action.shifts],
      };
    case ADD_SHIFT: {
      const shiftsCopy = [...state.shifts];
      shiftsCopy.push(action.payload.newShift);
      return { shifts: shiftsCopy };
    }
    case EDIT_SHIFT: {
      const shiftsCopy = state.shifts.filter(
        (shift) => shift.id !== action.payload.oldShiftId
      );
      shiftsCopy.push(action.payload.newShift);
      return { shifts: shiftsCopy };
    }
    case DELETE_SHIFT: {
      const shiftsCopy = state.shifts.filter(
        (shift) => shift.id !== action.payload.oldShiftId
      );
      return { shifts: shiftsCopy };
    }
    default:
      return state;
  }
};

export default shiftReducer;
