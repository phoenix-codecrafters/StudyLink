import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Envelope, Calendar3, Clock } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Sessions } from '../../api/session/Session';

/** Renders a single row in the List Stuff table. */
const StudySession = ({ studySession }) => {
  // start time
  const startHours = Math.floor(studySession.startTime / 100);
  const startMinutes = studySession.startTime % 100;
  // end time
  const endHours = Math.floor(studySession.endTime / 100);
  const endMinutes = studySession.endTime % 100;

  const startDate = new Date(studySession.year, studySession.month - 1, studySession.day, startHours, startMinutes);
  const endDate = new Date(studySession.year, studySession.month - 1, studySession.day, endHours, endMinutes);

  const dateString = startDate.toLocaleDateString('en-US'); // "MM/DD/YYYY"
  const startTime = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // "HH:MM AM/PM"
  const endTime = endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // "HH:MM AM/PM"

  const handleRemove = () => {
    swal('Are you sure you want to delete this session?', {
      dangerMode: true,
      buttons: true,
    }).then((confirmDelete) => {
      if (confirmDelete) {
        Sessions.collection.remove(studySession._id, (error) => (error ?
          swal('Error', error.message, 'error') :
          swal('Success', 'Session removed successfully', 'success')));
      }
    });
  };

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
              <Calendar3 /> Date: {dateString}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-muted">
              <Clock /> Time: {startTime} - {endTime}
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
          <Col className="d-flex justify-content-start">
            <Link to={`/editstudysession/${studySession._id}`} className="btn btn-primary">
              Edit
            </Link>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="danger" onClick={handleRemove}>
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
  // Require a document to be passed to this component.
StudySession.propTypes = {
  studySession: PropTypes.shape({
    className: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
    ghAttend: PropTypes.arrayOf(PropTypes.string),
    ssAttend: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
export default StudySession;
