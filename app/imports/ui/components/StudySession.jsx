import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';
import { Envelope, Calendar3, Clock } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. */
const StudySession = ({ studySession }) => {
  // Helper function to format dates and times
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dateString = date.toLocaleDateString('en-US'); // "MM/DD/YYYY"
    const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // "HH:MM AM/PM"
    return { dateString, timeString };
  };

  const startTime = formatDate(studySession.startTime);
  const endTime = formatDate(studySession.endTime);

  return (
    <Card className="h-100" border="success">
      <Card.Header>
        <Row>
          <Col>
            <Card.Title>{studySession.className}</Card.Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-muted">
              Created by: {studySession.owner}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-muted">
              <Calendar3 /> Date: {startTime.dateString}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-muted">
              <Clock /> Time: {startTime.timeString} - {endTime.timeString}
            </p>
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
        <Row className="mt-3">
          <Col className="text-right">
            <Link to={`/edit-session/${studySession._id}`} className="btn btn-primary">
              Edit
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

StudySession.propTypes = {
  studySession: PropTypes.shape({
    className: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default StudySession;
