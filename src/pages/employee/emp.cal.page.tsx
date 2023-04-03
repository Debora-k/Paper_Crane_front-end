import { DatePicker, useDatePickGetter, useDatePickReset } from '@bcad1591/react-date-picker';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Button, Modal } from 'antd';
import EmpHeader from 'components/Header/empHeader';
import { EmpTimeoffRequests } from 'dummyData/empTimeoffRequests';
import React, { useState } from 'react';

import './emp.cal.page.css';
import EmpNavbar from './emp.navbar';

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
  const [data, setData] = useState(EmpTimeoffRequests);
  const events = data
    .filter((request) => request.status !== 'rejected')
    .map((request) => ({
      // request.type means displaying a role
      title: request.status === 'pending' ? 'Pending' : 'Time-off',
      start: request.startDate,
      end: request.endDate,
      backgroundColor: request.status === 'pending' ? 'gray' : '#00CED1',
    }));

  const { pickedDates } = useDatePickGetter();
  const resetFunc = useDatePickReset();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequest = () => {
    // Axios should be here:
    const newData = [...data];
    newData.push({
      startDate: `${pickedDates.firstPickedDate?.getUTCFullYear().toString().padStart(4, '0')}-${(
        pickedDates.firstPickedDate?.getUTCMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${pickedDates.firstPickedDate
        ?.getUTCDate()
        .toString()
        .padStart(2, '0')}`,
      endDate: `${pickedDates.secondPickedDate?.getUTCFullYear().toString().padStart(4, '0')}-${(
        pickedDates.secondPickedDate?.getUTCMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${(pickedDates.secondPickedDate?.getUTCDate() + 1)
        .toString()
        .padStart(2, '0')}`,
      status: 'pending',
    });
    setData(newData);
    setIsModalOpen(false);
    resetFunc();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <EmpHeader />
      <EmpNavbar />
      <div className='calendar'>
        {/* This one is a popup after clicking 'Reqeust' button */}
        <Modal
          title='Choose day(s) for your time-off request'
          open={isModalOpen}
          onOk={handleRequest}
          onCancel={handleCancel}
          width={1000}
          footer={[
            <Button
              key='reset'
              style={{ backgroundColor: 'black', color: 'white', float: 'left' }}
              onClick={resetFunc}
            >
              Reset
            </Button>,
            <Button key='cancel' onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key='request'
              style={{ backgroundColor: 'black', color: 'white' }}
              onClick={handleRequest}
            >
              Send Request
            </Button>,
          ]}
        >
          {' '}
          <div>
            {/* This is another calendar after clicking 'Request' button */}
            <DatePicker disablePreviousDays />
            <div>{pickedDates.firstPickedDate?.toString()}</div>
            <div>{pickedDates.secondPickedDate?.toString()}</div>
          </div>
        </Modal>
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
