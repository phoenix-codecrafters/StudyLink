import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField } from 'uniforms-bootstrap5';
import { PersonFill, LockFill, Image, Journal } from 'react-bootstrap-icons';

const majorOptions = [
  {
    key: 'Information and Computer Sciences (ICS)',
    text: 'Information and Computer Sciences (ICS)',
    value: 'Information and Computer Sciences (ICS)',
  },
  {
    key: 'Information Technology Management (ITM)',
    text: 'Information Technology Management (ITM)',
    value: 'Information Technology Management (ITM)',
  },
  // Add more options as needed
];

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

  const { from } = location?.state || { from: { pathname: '/add' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }

  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={6}> {/* Adjusted for responsiveness */}
          <div className="text-center"> {/* Changed from Col to div */}
            <h2>Register your account</h2>
          </div> {/* Added closing tag */}
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text> {/* Added closing tag */}
                      <PersonFill />
                    </InputGroup.Text> {/* Added closing tag */}
                    <Form.Control type="email" name="email" placeholder="E-mail address" />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text> {/* Added closing tag */}
                      <LockFill />
                    </InputGroup.Text> {/* Added closing tag */}
                    <Form.Control type="password" name="password" placeholder="Password" />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                  <Col>
                    <Form.Label>First Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text> {/* Added closing tag */}
                        <PersonFill />
                      </InputGroup.Text> {/* Added closing tag */}
                      <Form.Control type="text" name="firstname" placeholder="First Name" />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text> {/* Added closing tag */}
                        <PersonFill />
                      </InputGroup.Text> {/* Added closing tag */}
                      <Form.Control type="text" name="lastname" placeholder="Last Name" />
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Image</Form.Label>
                  <InputGroup>
                    <InputGroup.Text> {/* Added closing tag */}
                      <Image />
                    </InputGroup.Text> {/* Added closing tag */}
                    <Form.Control type="text" name="image" placeholder="Image URL" />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Course Name</Form.Label>
                  <Form.Control type="text" name="coursename" placeholder="Course Name" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Class Standing</Form.Label>
                  <Form.Select name="classStanding">
                    <option>Choose...</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="graduate">Graduate</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Major</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Journal />
                    </InputGroup.Text>
                    <Form.Select name="major">
                      <option>Choose a major...</option>
                      {majorOptions.map((option) => (
                        <option key={option.key} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" name="subject" placeholder="Subject" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="description" placeholder="Tell us more about you" rows={5} />
                </Form.Group>
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
