import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. */
const ProfileAdmin = ({ profile }) => (
  <Card className="h-100" border="success">
    <Card.Header>
      <Row>
        <Col>
          <Card.Title>{profile.firstname}, {profile.lastname}</Card.Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-muted">
            Grade Status: {profile.classStanding}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-muted">
            Focus: {profile.major}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-muted">
            Score: {profile.score}
          </p>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
      <Row>
        <Col className="d-flex justify-content-center mb-2">
          <Image className="pro-pic-image" src={profile.image} />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-muted text-center">
            Description: {profile.description}
          </p>
        </Col>
      </Row>
    </Card.Body>
    <Card.Footer>
      <Row>
        <Col className="d-flex justify-content-start">
          <Link to={`/admineditprofile/${profile._id}`} className="btn btn-primary">
            Edit
          </Link>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);
  // Require a document to be passed to this component.
ProfileAdmin.propTypes = {
  profile: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    classStanding: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
export default ProfileAdmin;
