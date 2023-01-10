import PropTypes from "prop-types";

const vigilPropType = PropTypes.shape({
  id: PropTypes.string,
  address: PropTypes.string,
  startTime: PropTypes.instanceOf(Date),
  endTime: PropTypes.instanceOf(Date),
  notes: PropTypes.string,
});

const discussionPropType = PropTypes.shape({
  id: PropTypes.string,
  dateCreated: PropTypes.t,
  name: PropTypes.string,
  pinned: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.object),
});

export { vigilPropType, discussionPropType };
