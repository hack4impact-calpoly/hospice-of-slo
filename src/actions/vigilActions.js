import { INITIALIZE_VIGILS } from '../reduxConstants/index';

const initalizeVigils = (vigils) => ({
  type: INITIALIZE_VIGILS,
  vigils,
});

export default {
  initalizeVigils,
};
