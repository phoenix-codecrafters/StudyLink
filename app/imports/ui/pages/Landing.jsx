import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" className="my-auto py-3 d-flex justify-content-center">
    <Row className="d-flex justify-content-center" id="white-box">
      <Col md={5} className="text-center align-content-center">
        <div>
          <h1><strong>Welcome To StudyLink</strong></h1>
          <p>
            Nowadays, it’s pretty rare to see students interacting face-to-face with their peers. It’s tough to ask for help when everyone else seems to be doing just fine. But have no fear, because StudyLink is here to help!
          </p>
          <p>
            Our web platform connects students with others who are studying the same things. You can collaborate on assignments, projects, and exam prep with your buddies. With StudyLink, joining study sessions has never been easier.
          </p>
          <p>
            Simply log in or make an account to begin. Get started now!
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
