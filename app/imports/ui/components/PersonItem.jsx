import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PersonItem = ({ stuff, rank }) => (
  <tr>
    <td>{rank}</td>
    <td>{stuff.firstname} {stuff.lastname}</td>
    <td>{stuff.score}</td>
    <td>{stuff.major}</td>
  </tr>
);

// Require a document to be passed to this component.
PersonItem.propTypes = {
  stuff: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    score: PropTypes.number,
    major: PropTypes.string,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

export default PersonItem;
