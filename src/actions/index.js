import usersActions from "./usersActions";
import userActions from "./userActions";
import discussionActions from "./discussionActions";
import historyActions from "./historyActions";
import shiftActions from "./shiftActions";

export default {
  shifts: shiftActions,
  users: usersActions,
  user: userActions,
  discussions: discussionActions,
  history: historyActions,
};
