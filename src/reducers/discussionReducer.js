import {
  INITIALIZE_DISCUSSIONS, ADD_DISCUSSION, EDIT_DISCUSSION, DELETE_DISCUSSION,
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
    case EDIT_DISCUSSION: {
      const discussionsCopy = state.discussions.filter((d) => d.id !== action.payload.oldDiscussionId);
      discussionsCopy.push(action.payload.newDiscussion);
      return { discussions: discussionsCopy };
    }
    case DELETE_DISCUSSION: {
      const discussionsCopy = state.discussions.filter((d) => d.id !== action.payload.oldDiscussionId);
      console.log(action.payload.oldDiscussionId);
      return { discussions: discussionsCopy };
    }
    default:
      return state;
  }
};

export default discussionsReducer;
