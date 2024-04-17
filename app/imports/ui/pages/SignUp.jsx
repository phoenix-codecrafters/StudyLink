import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PersonFill, LockFill, Image, Journal, Textarea } from 'react-bootstrap-icons';

const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    image: String,
    classStanding: {
      type: String,
      allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'],
    },
    major: {
      type: String,
      allowedValues: ['Information and Computer Sciences (ICS)', 'Information Technology Management (ITM)', 'Computer Engineering'],
    },
    description: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password, firstname, lastname, image, classStanding, major, description } = doc;
    const profile = { firstname: firstname, lastname: lastname, image: image, classStanding: classStanding, major: major, description: description };
    Accounts.createUser({ email, username: email, password, profile }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  const { from } = location?.state || { from: { pathname: '/add' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }

  const handleSubmit = (data) => {
    submit(data);
  };

  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="text-center">
            <h2>Register your account</h2>
          </div>
          <AutoForm schema={bridge} onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
                <TextField type="email" name="email" placeholder="E-mail address" />
                <TextField type="password" name="password" placeholder="Password" />
                <TextField type="text" name="firstname" placeholder="First Name" />
                <TextField type="text" name="lastname" placeholder="Last Name" />
                <TextField type="text" name="image" placeholder="Image URL" />
                <SelectField name="classStanding" placeholder="Choose one...">
                  options= {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']}
                </SelectField>
                <SelectField name="major">
                  options= {['Information and Computer Sciences (ICS)', 'Information Technology Management (ITM)', 'Computer Engineering']}
                </SelectField>
                <TextField as="textarea" name="description" placeholder="Tell us more about you" rows={5} />
                <ErrorsField />
                <SubmitField value="Register" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login <Link to="/signin">here</Link>
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

SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
