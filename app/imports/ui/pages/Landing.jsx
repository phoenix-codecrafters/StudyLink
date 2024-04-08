import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" className="my-auto py-3 d-flex justify-content-center">
    <Row className="d-flex justify-content-center">
      <Col xs={3} className="text-center align-content-center">
        <div>
          <h2>Welcome</h2>
          <p>
            Word. WORD. Word. WORD. Word. WORD. Word. WORD. Word. WORD. Word. WORD. Word. WORD. Word. WORD. Word. WORD. Word. WORD. Word. WORD. Word.
          </p>
        </div>
      </Col>
      <Col xs={4}>
        <Image src="/images/logo-only.png" />
      </Col>
    </Row>
  </Container>
);

export default Landing;