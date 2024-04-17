import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

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
    });
    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  return (
    <div className="calendar-container" id="white-box" style={{ margin: 'auto', width: '97%', marginTop: '20px', marginBottom: '20px' }}>
      <div ref={calendarRef} />
    </div>
  );
};

export default CalendarPage;
