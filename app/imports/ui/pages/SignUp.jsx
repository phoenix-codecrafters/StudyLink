import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, LongTextField } from 'uniforms-bootstrap5';
import { Profiles } from '../../api/profile/Profile';

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
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
    const owner = email;
    const score = 0;
    Profiles.collection.insert({ firstname, lastname, image, classStanding, major, description, score, owner });
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
        <Col xs={12} md={6}>
          <div className="text-center">
            <h2>Register your account</h2>
          </div>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField type="email" name="email" label="E-Mail:" placeholder="E-mail address" />
                <TextField type="password" name="password" label="Password:" placeholder="Password" />
                <Row>
                  <Col>
                    <TextField type="text" name="firstname" label="First Name:" placeholder="First Name" />
                  </Col>
                  <Col>
                    <TextField type="text" name="lastname" label="Last Name:" placeholder="Last Name" />
                  </Col>
                </Row>
                <TextField type="text" name="image" label="Image Url:" placeholder="Image URL" />
                <SelectField name="classStanding" label="Grade Status:" placeholder="Choose...">
                  options= {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']}
                </SelectField>
                <SelectField label="Focus:" name="major" placeholder="Choose...">
                  options= {['Information and Computer Sciences (ICS)', 'Information Technology Management (ITM)', 'Computer Engineering']}
                </SelectField>
                <LongTextField name="description" label="Description:" placeholder="Tell us more about you" />
                <ErrorsField />
                <SubmitField value="Register" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert id="white-box-logsign" variant="light">
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
