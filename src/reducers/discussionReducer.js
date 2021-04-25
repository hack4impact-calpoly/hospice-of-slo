import {
  INITIALIZE_DISCUSSIONS, ADD_DISCUSSION,
} from '../reduxConstants/index';

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
    case ADD_DISCUSSION: {
      const discussionsCopy = [...state.discussions];
      discussionsCopy.push(action.payload.newDiscussion);
      return { discussions: discussionsCopy };
    }

    default:
      return state;
  }
};

export default discussionsReducer;
