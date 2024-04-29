import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import LoadingSpinner from '../components/LoadingSpinner';
import EventPopup from '../components/EventPopup'; // Assuming correct path
import { Sessions } from '../../api/session/Session';

const CalendarPage = () => {
  const { events, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    const rdy = subscription.ready();
    const eventsData = Sessions.collection.find().fetch();
    return {
      events: eventsData,
      ready: rdy,
    };
  });

  // Function to format time from "HHMM" to "HH:MM:SS"
  const formatTime = (time) => {
    // Convert time to string if it isn't already
    const timeString = time.toString().padStart(4, '0');
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2, 4);
    return `${hours}:${minutes}:00`;
  };

  // Format events for FullCalendar
  const formattedEvents = events.map(event => {
    // Convert day, month, and year properties to strings
    const day = String(event.day).padStart(2, '0');
    const month = String(event.month).padStart(2, '0');
    const year = String(event.year);

    // Create ISO8601 date-time strings for start and end
    const start = `${year}-${month}-${day}T${formatTime(event.startTime)}`;
    const end = `${year}-${month}-${day}T${formatTime(event.endTime)}`;

    // Return the formatted event object
    return {
      title: event.className,
      start,
      end,
      description: event.description,
      id: event._id,
    };
  });

  const [showEventPopup, setShowEventPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShowEventPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
    setShowEventPopup(false);
  };

  return (
    <div>
      <div className="calendar-container" id="white-box" style={{ margin: 'auto', width: '97%', marginTop: '20px', marginBottom: '20px' }}>
        {ready ? (
          <>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev, next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay',
              }}
              events={formattedEvents}
              eventClick={handleEventClick}
            />
            {showEventPopup && selectedEvent && (
              <EventPopup event={selectedEvent} onClose={handleClosePopup} />
            )}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
