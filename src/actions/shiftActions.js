import {
    INITIALIZE_SHIFTS,
  } from "../reduxConstants/index";
  
  const initializeShifts = (shift) => ({
    type: INITIALIZE_SHIFTS,
    shift,
  });

  
  export default {
    initializeShifts,
  };
  