import {
  INITIALIZE_HISTORY,
  ADD_HISTORY_SHIFT,
  DELETE_HISTORY_SHIFT,
} from "../reduxConstants/index";

const initialState = {
  historyShifts: [],
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_HISTORY:
      console.log("Initializing History store");
      return {
        historyShifts: [...action.historyShifts],
      };
    case ADD_HISTORY_SHIFT: {
      const shiftsCopy = [...state.historyShifts];
      shiftsCopy.push(action.payload.newShift);
      return { historyShifts: shiftsCopy };
    }
    case DELETE_HISTORY_SHIFT: {
      const shiftsCopy = state.historyShifts.filter(
        (d) => d.id !== action.payload.oldShiftId
      );
      return { historyShifts: shiftsCopy };
    }
    default:
      return state;
  }
};

export default historyReducer;
