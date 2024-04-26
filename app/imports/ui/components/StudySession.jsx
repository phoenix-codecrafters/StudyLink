import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { Envelope } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StudySession = ({ studySession }) => (
  <Card className="h-100" border="success">
    <Card.Header>
      <Row>
        <Col>
          <Image src={studySession.image} width={125} className="ms-3 rounded-3 shadow" />
        </Col>
        <Col>
          <br />
          <Card.Title> {studySession.name} </Card.Title>
          <Card.Subtitle className="text-muted">
            <Badge bg="success"> {studySession.subject} </Badge>
            <br />
            <p className="mt-1"> Time: {studySession.dateStart.toLocaleString()} - {studySession.dateEnd.toLocaleString()}</p>
          </Card.Subtitle>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item> {studySession.description} </ListGroup.Item>
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
    name: PropTypes.string,
    subject: PropTypes.string,
    location: PropTypes.string,
    hostName: PropTypes.string,
    dateStart: PropTypes.instanceOf(Date),
    dateEnd: PropTypes.instanceOf(Date),
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default StudySession;
