import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar component

const CalendarPage = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth dayGridWeek dayGridDay',
      },
      events: 'events',
      eventContent: 'renderEventContent',
    });
    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  const events = [ // Define events
    {
      title: 'Event 1',
      start: '2024-04-10',
      end: '2024-04-12',
    },
    {
      title: 'Event 2',
      start: '2024-04-15',
      end: '2024-04-17',
    },
  ];

  return (
    <div>
      <div className="calendar-container" id="white-box" style={{ margin: 'auto', width: '97%', marginTop: '20px', marginBottom: '20px' }}>
        <div ref={calendarRef} />
      </div>
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalendarPage;
