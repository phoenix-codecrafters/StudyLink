import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import Profile from '../pages/Profile';
import AboutUs from '../pages/AboutUs';
import MyStudySessions from '../pages/MyStudySessions';
import EditStudySession from '../pages/EditStudySession';
import LeaderBoard from '../pages/LeaderBoard';
import RulesAndRegulations from '../pages/RulesAndRegulations';
import EditProfile from '../pages/EditProfile';
import AddStudySession from '../pages/AddStudySession';
import CalendarPage from '../pages/CalendarPage';
import AdminListStudySessions from '../pages/AdminListStudySessions';
import AdminListProfiles from '../pages/AdminListProfiles';
import AdminEditProfile from '../pages/AdminEditProfile';
import AdminEditStudySession from '../pages/AdminEditStudySession';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/RulesAndRegulations" element={<RulesAndRegulations />} />
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/leader" element={<ProtectedRoute><LeaderBoard /></ProtectedRoute>} />
          <Route path="/addstudysession" element={<ProtectedRoute><AddStudySession /></ProtectedRoute>} />
          <Route path="/mystudysessions" element={<ProtectedRoute><MyStudySessions /></ProtectedRoute>} />
          <Route path="/editstudysession/:_id" element={<ProtectedRoute><EditStudySession /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="/adminlistsessions" element={<AdminProtectedRoute ready={ready}><AdminListStudySessions /></AdminProtectedRoute>} />
          <Route path="/adminlistprofiles" element={<AdminProtectedRoute ready={ready}><AdminListProfiles /></AdminProtectedRoute>} />
          <Route path="/admineditprofile/:_id" element={<AdminProtectedRoute ready={ready}><AdminEditProfile /></AdminProtectedRoute>} />
          <Route path="/admineditsession/:_id" element={<AdminProtectedRoute ready={ready}><AdminEditStudySession /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
