import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" className="my-auto py-5 d-flex justify-content-center">
    <Row className="d-flex justify-content-center">
      <Col md={5} className="custom-column text-center align-content-center custom-heading">
        <div>
          <h1><strong>Welcome to StudyLink!</strong></h1>
          <h5>
            Nowadays, it’s pretty rare to see students interacting face-to-face with their peers. It’s tough to ask for help when everyone else seems to be doing just fine. But have no fear, because StudyLink is here to help!
          </h5>
          <h5>
            Our web platform connects students with others who are studying the same things. You can collaborate on assignments, projects, and exam prep with your buddies. With StudyLink, joining study sessions has never been easier.
          </h5>
          <h5>
            Simply log in or make an account to begin. Get started now!
          </h5>
        </div>
      </Col>
      <Col md={4} className="custom-column text-center" id="white-soft-box">
        <Image src="https://www.regenesys.net/wp-content/uploads/2023/09/study-1.png" width="300px" />
      </Col>
    </Row>
  </Container>
);

export default Landing;
