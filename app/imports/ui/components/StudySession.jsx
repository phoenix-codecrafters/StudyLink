import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';
import { Envelope } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. */
const StudySession = ({ studySession }) => (
  <Card className="h-100" border="success">
    <Card.Header>
      <Row>
        <Col>
          <br />
          <Card.Title>{studySession.className}</Card.Title>
          <Card.Subtitle className="text-muted">
            <p className="mt-1">Time: {studySession.startTime.toLocaleString()} - {studySession.endTime.toLocaleString()}</p>
          </Card.Subtitle>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{studySession.description}</ListGroup.Item>
        <ListGroup.Item>
          <Envelope /> {studySession.owner}
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
StudySession.propTypes = {
  studySession: PropTypes.shape({
    className: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
    ghAttend: PropTypes.string,
    ssAttend: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default StudySession;
