import { INITIALIZE_USER } from '../reduxConstants/index';

const initializeUser = (user) => ({
  type: INITIALIZE_USER,
  user,
});

export default {
  initializeUser,
};
