import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile';
import { Sessions } from '../../api/session/Session';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addProfile = (profile) => {
  console.log(` Adding: ${profile.firstname} (${profile.owner})`);
  Profiles.collection.insert(profile);
};

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(profile => addProfile(profile));
  }
}

const addSession = (session) => {
  console.log(` Adding: ${session.className} (${session.owner})`);
  Sessions.collection.insert(session);
};

if (Sessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultSessions) {
    console.log('Creating default sessions.');
    Meteor.settings.defaultSessions.forEach(session => addSession(session));
  }
}
