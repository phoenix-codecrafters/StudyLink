import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Envelope } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <div className="text-center">
        <a href="https://github.com/phoenix-codecrafters/StudyLink" className="custom-link">
          PhoenixCodeCrafters
        </a>
        <br />
        Information & Computer Sciences
        <br />
        University of Hawaii at Manoa
        <br />
        Project Homepage
        <hr />
        <Row>
          <Col className="text-center">
            <strong>Gi Young Back</strong>
            <br />
            <a href="mailto:giyoung7@hawaii.edu" aria-label="Email Gi Young Back">
              <Envelope className="icon-margin" />
            </a>
          </Col>
          <Col className="text-center">
            <strong>Andrew Gibbons</strong>
            <br />
            <a href="mailto:agibbons@hawaii.edu" aria-label="Email Andrew Gibbons">
              <Envelope className="icon-margin" />
            </a>
          </Col>
          <Col className="text-center">
            <strong>Stephanie Castelblanco</strong>
            <br />
            <a href="mailto:scastelb@hawaii.edu" aria-label="Email Stephanie Castelblanco">
              <Envelope className="icon-margin" />
            </a>
          </Col>
          <Col className="text-center">
            <strong>Benjamin Banilower</strong>
            <br />
            <a href="mailto:bbanilow@hawaii.edu" aria-label="Email Benjamin Banilower">
              <Envelope className="icon-margin" />
            </a>
          </Col>
          <Col className="text-center">
            <strong>Kelly Tam</strong>
            <br />
            <a href="mailto:ktam808@hawaii.edu" aria-label="Email Kelly Tam">
              <Envelope className="icon-margin" />
            </a>
          </Col>
        </Row>
      </div>
    </Container>
  </footer>
);

export default Footer;
