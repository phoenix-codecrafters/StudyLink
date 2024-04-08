import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import { PersonFill, LockFill, Image, Journal } from 'react-bootstrap-icons';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    coursename: String,
    image: String,
    major: String,
    subject: String,
    description: String,

  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password, firstname, lastname, coursename, image, major, subject, description } = doc;
    Accounts.createUser({ email, username: email, password, firstname, lastname, coursename, image, major, subject, description }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <PersonFill />
                    </InputGroup.Text>
                    <Form.Control type="email" name="email" placeholder="E-mail address" />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <LockFill />
                    </InputGroup.Text>
                    <Form.Control type="password" name="password" placeholder="Password" />
                  </InputGroup>
                </Form.Group>

                {/* First Name and Last Name in the same row */}
                <Form.Group as={Row} className="mb-2">
                  <Col>
                    <Form.Label>First Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <PersonFill />
                      </InputGroup.Text>
                      <Form.Control type="text" name="firstname" placeholder="First Name" />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <PersonFill />
                      </InputGroup.Text>
                      <Form.Control type="text" name="lastname" placeholder="Last Name" />
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Image</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Image />
                    </InputGroup.Text>
                    <Form.Control type="text" name="image" placeholder="Image URL" />
                  </InputGroup>
                </Form.Group>
                <TextField name="coursename" label="Course Name" placeholder="Course Name" />
                <Form.Group className="mb-2">
                  <Form.Label>Major</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Journal />
                    </InputGroup.Text>
                    <Form.Control type="text" name="major" placeholder="Major" />
                  </InputGroup>
                </Form.Group>
                <TextField name="subject" label="Subject" placeholder="Subject" />
                <LongTextField name="description" label="Description" placeholder="Tell us more about you" component="textarea" rows={5} />
                <ErrorsField />
                <SubmitField value="Register" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
