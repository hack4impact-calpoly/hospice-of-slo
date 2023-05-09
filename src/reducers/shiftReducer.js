import {
    INITIALIZE_SHIFTS,
  } from "../reduxConstants/index";
  
  const initialState = {
    shifts: [],
  };
  
  const shiftReducer = (state = initialState, action) => {
    switch (action.type) {
      case INITIALIZE_SHIFTS:
        console.log("Initializing SHIFTS store");
        return {
          shifts: [...action.shifts],
        };
      default:
        return state;
    }
  };
  
  export default vigilReducer;
  