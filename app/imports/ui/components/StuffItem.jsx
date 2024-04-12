import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StuffItem = ({ stuff }) => (
  <tr>
    <td>{stuff.rank}</td>
    <td>{stuff.name}</td>
    <td>{stuff.score}</td>
    <td>{stuff.attendance}</td>
  </tr>
);

// Require a document to be passed to this component.
StuffItem.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    rank: PropTypes.number,
    attendance: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
};

export default StuffItem;
