import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import React from 'react';

import './emp.cal.page.css';
import EmpNavbar from './emp.navbar';

const events = [{ title: 'Time-off', start: new Date() }];
// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

const EmpCalendar = () => {
  return (
    <div>
      <EmpNavbar />
      <div className='calendar'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          events={events}
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
};

export default EmpCalendar;
