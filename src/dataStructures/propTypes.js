import PropTypes from 'prop-types';

const eventPropType = PropTypes.shape({
  id: PropTypes.string,
  address: PropTypes.string,
  dates: PropTypes.arrayOf(PropTypes.string),
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  notes: PropTypes.string,
});

export default eventPropType;