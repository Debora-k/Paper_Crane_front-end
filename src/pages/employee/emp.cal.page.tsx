import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Modal } from 'antd';
import React, { useState } from 'react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequest = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <EmpNavbar />
      <div className='calendar'>
        {/* This one is a popup after clicking 'Reqeust' button */}
        <Modal
          title='Choose day(s) for your time-off request'
          open={isModalOpen}
          onOk={handleRequest}
          onCancel={handleCancel}
        ></Modal>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          customButtons={{
            Request: {
              text: 'Request',
              click: () => {
                setIsModalOpen(true);
              },
            },
          }}
          headerToolbar={{
            right: 'Request today prev,next',
          }}
        />
      </div>
    </div>
  );
};

export default EmpCalendar;
