import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Col id="signout-page" className="text-center py-3">
      <Container id="white-soft-box" style={{ width: '80%', height: 'auto', margin: '0 auto', padding: '20px', fontFamily: 'Concert One, sans-serif' }}>
        <h1>You have been signed out successfully!</h1>
        <p>Thank you for using our service!</p>
        <p>
          <a href="/">Return to Landing</a>
        </p>
        <p>
          <a href="/signin">Sign In Again</a>
        </p>
        <p>For your security, please close the browser window or clear your browser cache.</p>
      </Container>
    </Col>
  );
};

export default SignOut;
