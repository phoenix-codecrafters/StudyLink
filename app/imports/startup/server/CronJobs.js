import { SyncedCron } from 'meteor/percolate:synced-cron';
import { Sessions } from '../imports/api/sessions'; // Adjust path as needed
import { Profiles } from '../imports/api/session/Session';

SyncedCron.add({
  name: 'Check Session End Times',
  schedule: function (parser) {
    // Schedule the job to run every minute
    return parser.text('every 1 minute');
  },
  job: function () {
    // Get current date and time
    const currentDate = new Date();

    // Retrieve all sessions from the collection
    const sessions = Sessions.find().fetch();

    // Loop through each session
    sessions.forEach(session => {
      const endDateTime = new Date(session.year, session.month - 1, session.day, session.endHours, session.endMinutes);
      if (currentDate > endDateTime) {
        // Session has ended, you can update the session document here
        // For example:
        Sessions.update(session._id, { $set: { isComplete: true } });
      }
      if (session.pointsAssign === false && session.isComplete === true) {
        // Assuming `ghAttend` and `ssAttend` are arrays of user IDs
        const ghAttendUsers = session.ghAttend;
        const ssAttendUsers = session.ssAttend;

        // Logic for assigning points to `ghAttendUsers` array
        ghAttendUsers.forEach(userId => {
          // Add logic to assign points to users in the `ghAttendUsers` array
          // Example: Update user document to increment points
          Profiles.collection.update({ _id: userId }, { $inc: { score: 2 } }); // Increment points by 2
        });

        // Logic for assigning points to `ssAttendUsers` array
        ssAttendUsers.forEach(userId => {
          // Add logic to assign points to users in the `ssAttendUsers` array
          // Example: Update user document to increment points
          Profiles.collection.update({ _id: userId }, { $inc: { score: 3 } }); // Increment points by 3
        });

        // Mark session as points assigned
        Sessions.update({ _id: session._id }, { $set: { pointsAssign: true } });
      }
    });
  },
});

// Start the cron job
SyncedCron.start();
