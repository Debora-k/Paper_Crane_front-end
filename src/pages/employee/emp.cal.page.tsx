import { DatePicker, useDatePickGetter, useDatePickReset } from '@bcad1591/react-date-picker';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Button, Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import EmpHeader from 'components/Header/empHeader';
import { EmpLog } from 'dummyData/empLogData';
import { EmpTimeoffRequests } from 'dummyData/empTimeoffRequests';
import { projects } from 'dummyData/projectsData';
import React, { useState } from 'react';

import './emp.cal.page.css';
import EmpNavbar from './emp.navbar';

const EmpCalendar = () => {
  const [data, setData] = useState(EmpTimeoffRequests);
  const [logData, setLogData] = useState(EmpLog);

  const events: any[] = data
    .filter((request) => request.status !== 'rejected')
    .map((request) => ({
      // request.type means displaying a role
      title: request.status === 'pending' ? 'Pending' : 'Time-off',
      start: request.startDate,
      end: request.endDate,
      backgroundColor: request.status === 'pending' ? 'gray' : '#00CED1',
    }))
    // will add a function which combines all the worked time on the same day in calendar
    .concat(
      logData.map((log) => {
        return {
          title: `Worked hours:  ${log.workedHours}`,
          start: log.date,
          allDay: true,
          backgroundColor: 'white',
          textColor: 'black',
        } as any;
      }),
    );

  const { pickedDates } = useDatePickGetter();
  const resetFunc = useDatePickReset();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);

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

  const logForm = (i) => {
    return (
      <div className='logform' key={i}>
        <Form.Item label='Project' name={['project', i]}>
          <Select
            placeholder='Select a project'
            options={projects.map((project) => {
              return { value: project.id, label: project.pName };
            })}
          />
        </Form.Item>
        <Form.Item label='Tasks' name={['tasks', i]}>
          <TextArea />
        </Form.Item>
        <Form.Item
          label='Hours worked on'
          colon={false}
          name={['workedHours', i]}
          wrapperCol={{ span: 5 }}
        >
          <Input suffix='hours' />
        </Form.Item>
      </div>
    );
  };

  // inputs are for a log form in daily time log modal
  const [inputs, setInputs] = useState([logForm(0)]);

  const addLogFunc = () => {
    setInputs(inputs.concat([logForm(inputs.length)]));
  };

  const [form] = Form.useForm();
  const handleLogRequest = (values: any) => {
    setIsLogOpen(false);
    // { project: ['p1', 'p3'], tasks: ['p1 tasks', 'p3 tasks'], hours: [5, 8]}

    const newLogData = [...logData];

    for (let i = 0; i < values.project.length; i++) {
      newLogData.push({
        date: new Date().toISOString().substring(0, 10),
        workedHours: values.workedHours[i],
        pId: values.project[i],
        tasks: values.tasks[i],
      });
    }

    setLogData(newLogData);

    setInputs([logForm(0)]);
    form.resetFields();
  };

  const handleLogCancel = () => {
    setIsLogOpen(false);
    setInputs([logForm(0)]);
    form.resetFields();
  };

  const handleEventClick = (info) => {
    const date = info.event.start.toISOString().substring(0, 10);
    const logs = logData.filter((log) => log.date === date);
    setIsLogOpen(true);
    const logForms = [];
    for (let i = 0; i < logs.length; i++) {
      logForms.push(logForm(i));
      form.setFieldValue(['project', i], logs[i].pId);
      form.setFieldValue(['workedHours', i], logs[i].workedHours);
      form.setFieldValue(['tasks', i], logs[i].tasks);
    }
    setInputs(logForms);
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
              htmlType='submit'
            >
              Send Request
            </Button>,
          ]}
        >
          <div>
            {/* This is another calendar after clicking 'Request' button */}
            <DatePicker disablePreviousDays />
            <div>{pickedDates.firstPickedDate?.toString()}</div>
            <div>{pickedDates.secondPickedDate?.toString()}</div>
          </div>
        </Modal>
        <Modal
          title={
            <div>
              Daily Time Log
              <Button
                key='add'
                style={{ backgroundColor: 'black', color: 'white', marginLeft: 20 }}
                onClick={addLogFunc}
              >
                Add
              </Button>
            </div>
          }
          open={isLogOpen}
          onOk={handleLogRequest}
          onCancel={handleLogCancel}
          width={600}
          footer={[]}
        >
          <Form form={form} onFinish={handleLogRequest}>
            {inputs}

            <Form.Item>
              <Button key='cancel' style={{ float: 'right' }} onClick={handleLogCancel}>
                Cancel
              </Button>
              <Button
                key='request'
                style={{ backgroundColor: 'black', color: 'white', float: 'right' }}
                htmlType='submit'
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          events={events}
          eventClick={handleEventClick}
          customButtons={{
            Request: {
              text: 'Request',
              click: () => {
                setIsModalOpen(true);
              },
            },
            Log: {
              text: 'Log',
              click: () => {
                setIsLogOpen(true);
              },
            },
          }}
          headerToolbar={{
            right: 'Log Request today prev,next',
          }}
        />
      </div>
    </div>
  );
};

export default EmpCalendar;
