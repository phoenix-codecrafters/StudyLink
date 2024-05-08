import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const RulesAndRegulations = () => (
  <Container id="rules-and-reg" className="my-auto py-3 " style={{ fontFamily: 'Concert One, sans-serif' }}>
    <Row className="d-flex justify-content-center pb-2" style={{ backgroundColor: 'white', marginBottom: '20px', paddingBottom: '20px' }}>
      <Col md={10}>
        <Col className="text-center py-3">
          <h1>Rules and Regulations</h1>
          {/* eslint-disable-next-line max-len */}
          <p>Welcome to our rules and regulation page! This page outlines the guidelines that will help you use our StudyLink resource. We believe that a respectful study environment is essential for the success of all learners, and these rules are designed to ensure a positive and productive experience for everyone.</p>
        </Col>
        <Row>
          <Col className="me-5" id="white-box">
            <h3>Leaderboard Game</h3>
            <ul>
              <li>1. Point System: Participants can earn points by joining study sessions as either a grasshopper(student) or as a sensei(teacher). .</li>
              <ul>
                <li>You will be awarded 1 point for grasshopper participation.</li>
                <li>You will be awarded 3 points for sensei participation.</li>
              </ul>
              <li>2. Check the Leaderboard Page: See where you are at on the board! Top 3 members will get a prize at the end of each semester.</li>
              <li>3. Leaderboard Reset: The leaderboard will reset every semester to encourage students to keep participating and to welcome new users into the game!</li>
              <li>4. Special Weeks: Stay tuned into StudyLink as there will be certain weeks where points awarded will be double!</li>
            </ul>
          </Col>
          <Col id="white-box">
            <h3>General Guidelines</h3>
            <ul>
              <li>1. Respectful Behavior: Users must treat others with respect and refrain from engaging in harassment, discrimination, or offensive behavior.</li>
              <li>2. Make an Account: Users are required to create an account to access certain study materials and features.</li>
              <li>3. Profile Picture: Students are required to provide a picture of themselves so they may be easily identified in study sessions.</li>
              {/* eslint-disable-next-line max-len */}
              <li>4. Join or Make a Session: If you want to join a session, make sure to check the calendar provided for you to see if there is a session you are interested in joining. Otherwise, you are free to make a session. Try to add
                clear and specific details to your study session!
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <p style={{ color: 'white' }}>.</p>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default RulesAndRegulations;
