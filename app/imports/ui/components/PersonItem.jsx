import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Score table. See pages/ListScore.jsx. */
const PersonItem = ({ score, rank }) => (
  <tr>
    <td>{rank}</td>
    <td>{score.firstname} {score.lastname}</td>
    <td>{score.score}</td>
    <td>{score.major}</td>
  </tr>
);

// Require a document to be passed to this component.
PersonItem.propTypes = {
  score: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    score: PropTypes.number,
    major: PropTypes.string,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

export default PersonItem;
