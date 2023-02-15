import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import React from 'react';

import './admin.cal.page.css';
import AdminNavbar from './admin.navbar';

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

const AdminCalendar = () => {
  return (
    <div>
      <AdminNavbar />
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

export default AdminCalendar;
