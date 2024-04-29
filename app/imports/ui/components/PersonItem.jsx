import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Score table. See pages/ListScore.jsx. */
const PersonItem = ({ profile, rank }) => (
  <tr>
    <td>{rank}</td>
    <td>{profile.firstname}, {profile.lastname}</td>
    <td>{profile.score}</td>
    <td>{profile.major}</td>
  </tr>
);

// Require a document to be passed to this component.
PersonItem.propTypes = {
  profile: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    score: PropTypes.number,
    major: PropTypes.string,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

export default PersonItem;
