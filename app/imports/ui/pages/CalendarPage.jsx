import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sessions } from '../../api/session/Session';

const Calendar = () => {
  const { events, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    const rdy = subscription.ready();
    const event = Sessions.collection.find().fetch();
    return {
      events: event,
      ready: rdy,
    };
  });

  const formattedEvents = events.map(event => ({
    title: event.class,
    start: event.start,
    end: event.end,
  }));

  return (
    <div>
      <div className="calendar-container" id="white-box" style={{ margin: 'auto', width: '97%', marginTop: '20px', marginBottom: '20px' }}>
        {ready ? (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay',
            }}
            events={formattedEvents}
          />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>

  );
};

export default Calendar;
