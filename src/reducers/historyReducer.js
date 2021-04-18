import { INITIALIZE_HISTORY } from '../reduxConstants/index';

const initialState = {
  historyShifts: [],
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_HISTORY:
      console.log('Initializing History store');
      return {
        historyShifts: action.historyShifts,
      };
    default:
      return state;
  }
};

export default historyReducer;
