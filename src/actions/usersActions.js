import { INITIALIZE_USERS } from "../reduxConstants/index";

const initializeUsers = (users) => ({
  type: INITIALIZE_USERS,
  users,
});

export default {
  initializeUsers,
};
