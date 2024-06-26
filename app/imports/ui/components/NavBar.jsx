import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
// eslint-disable-next-line no-unused-vars
import Profile from '../pages/Profile';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image src="/images/studylink-logo.png" style={{ height: '100px', width: '240px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start custom-heading">

            {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <NavDropdown id="admin-dropdown" title="Admin Tools">
                <NavDropdown.Item id="adminlistsessions" as={NavLink} to="/adminlistsessions" key="adminsesh">
                  Session Panel
                </NavDropdown.Item>
                <NavDropdown.Item id="adminlistprofiles" as={NavLink} to="/adminlistprofiles" key="adminprof">
                  Profile Panel
                </NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}

            {currentUser ? ([
              <Nav.Link id="calendar" as={NavLink} to="/calendar" key="calendar">Calendar</Nav.Link>,
              <Nav.Link id="addstudysession" as={NavLink} to="/addstudysession" key="addstudysession">Add Study Session</Nav.Link>,
              <Nav.Link id="leaderboard" as={NavLink} to="/leader" key="leaderboard">Leaderboard</Nav.Link>,
              <Nav.Link id="sessions" as={NavLink} to="/mystudysessions" key="listmysessions">Owned Study Sessions</Nav.Link>,
            ]) : ([
              <Nav.Link id="about-us-nav" as={NavLink} to="/about-us" key="about-us">About Us</Nav.Link>,
              <Nav.Link id="rules-and-regulations" as={NavLink} to="/RulesAndRegulations" key="rulesandregulations">Rules and Regulations</Nav.Link>,
            ])}

          </Nav>
          <Nav className="justify-content-end custom-heading">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-my-profile" as={NavLink} to="/profile">
                  <PersonFill />
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
