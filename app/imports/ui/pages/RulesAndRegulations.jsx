import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const RulesAndRegulations = () => (
  <Container className="py-3">
    <Row className="justify-content-center pb-2">
      <Col md={7}>
        <Col className="text-center">
          <h2>Rules and Regulations</h2>
        </Col>
        <Row className="" id="white-box">
          <Col>
            <ul>
              <li>Rule 1</li>
              <li>Rule 2</li>
              <li>Rule 3</li>
              <li>Rule 4</li>
            </ul>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default RulesAndRegulations;
