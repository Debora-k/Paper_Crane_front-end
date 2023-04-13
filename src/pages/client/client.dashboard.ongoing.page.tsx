import { DataContext } from 'SharedData';
import { message } from 'antd';
import CheckPendingRequestModal from 'components/CheckPendingRequestModal/CheckPendingRequestModal';
import DashboardHeader from 'components/Header/dashboardHeader';
import SendRequestModal from 'components/SendRequestModal/SendRequestModal';
import { EmpLog } from 'dummyData/empLogData';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import './client.dashboard.ongoing.page.css';

const ClientDashboardOnGoingPage = () => {
  // getting dashboards data from back-end
  const { dashboards, projects } = useContext(DataContext);
  const { cId } = useParams();
  const dashboard = dashboards.find((dashboard) => dashboard.cId === Number(cId));
  const project = projects.find((project) => project.id === dashboard.pId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckPendingRequestModalOpen, setIsCheckPendingRequestModalOpen] = useState(false);
  const [logData] = useState(EmpLog);
  const [scopes, setScopes] = useState([
    {
      id: 1,
      name: 'Login Page with Google Signin',
    },
    {
      id: 2,
      name: 'Products page',
    },
    {
      id: 3,
      name: 'User profile page',
    },
    {
      id: 4,
      name: 'Shopping cart page',
    },
  ]);

  const handleOk = () => {
    setIsModalOpen(false);
    message.success('Request sent successfully');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCheckPendingRequestOk = () => {
    setIsCheckPendingRequestModalOpen(false);
  };

  const handleCheckPendingRequestCancel = () => {
    setIsCheckPendingRequestModalOpen(false);
  };

  const scopeChangeHandler = (values: any) => {
    setScopes(values);
  };

  return (
    <div
      style={{
        backgroundColor: dashboard.theme === 'light' ? 'white' : 'black',
        color: dashboard.theme === 'dark' ? 'white' : 'black',
      }}
    >
      <SendRequestModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onChangeScopes={scopeChangeHandler}
        scopes={scopes}
      />
      <CheckPendingRequestModal
        isModalOpen={isCheckPendingRequestModalOpen}
        handleOk={handleCheckPendingRequestOk}
        handleCancel={handleCheckPendingRequestCancel}
      />
      <DashboardHeader theme={dashboard.theme} />
      <div className='dashboard-ctn'>
        <h1>Dashboard</h1>
        <div className='grid-ctn'>
          <div>
            <h2>Current Project</h2>
            <div className='project-ctn'>
              <h3>Project 1</h3>
              <p>Start Date: April 1st, 2023</p>
              <p>Contract End Date: Decemeber 1st, 2023</p>
            </div>
          </div>
          <div>
            <h2>Scopes</h2>
            <div className='project-ctn scope'>
              {scopes.map((scope) => (
                <p key={scope.id}>{scope.name}</p>
              ))}
            </div>
          </div>
          <div>
            <div className='btn__ctn'>
              <button
                style={{
                  backgroundColor: dashboard.theme === 'light' ? 'white' : 'black',
                  color: dashboard.theme === 'dark' ? 'white' : 'black',
                }}
                className='secondary__btn'
                onClick={() => setIsModalOpen(true)}
              >
                Send Request
              </button>
              <button
                style={{
                  backgroundColor: dashboard.theme === 'light' ? 'white' : 'black',
                  color: dashboard.theme === 'dark' ? 'white' : 'black',
                }}
                className='secondary__btn'
                onClick={() => setIsCheckPendingRequestModalOpen(true)}
              >
                Check Pending Requests
              </button>
            </div>
            <div>
              <button className='primary__btn'>View Repository</button>
            </div>
          </div>
          <div>
            <h2>Past Project</h2>
            <div className='project-ctn projects'>
              <div className='project-ctn-item'>
                <h3>Project 4</h3>
                <p>Start Date: April 1st, 2023</p>
                <p>Contract End Date: Decemeber 1st, 2023</p>
              </div>
              <div className='project-ctn-item'>
                <h3>Project 5</h3>
                <p>Start Date: April 1st, 2023</p>
                <p>Contract End Date: Decemeber 1st, 2023</p>
              </div>
              <div className='project-ctn-item'>
                <h3>Project 4</h3>
                <p>Start Date: April 1st, 2023</p>
                <p>Contract End Date: Decemeber 1st, 2023</p>
              </div>
              <div className='project-ctn-item'>
                <h3>Project 5</h3>
                <p>Start Date: April 1st, 2023</p>
                <p>Contract End Date: Decemeber 1st, 2023</p>
              </div>
            </div>
          </div>
          <div>
            <h2>Task Completion Hours</h2>
            <div className='table-ctn'>
              <table className='table'>
                <tr>
                  <th>Task Title</th>
                  <th>Hours worked</th>
                </tr>
                {project?.tasks.map((task) => {
                  return (
                    <tr
                      key={task.id}
                      style={
                        dashboard.theme === 'dark'
                          ? { color: 'white', backgroundColor: 'black' }
                          : {}
                      }
                    >
                      <td>{task.title}</td>
                      <td>
                        {logData
                          .filter((log) => log.pId === project.id && log.taskId === task.id)
                          .map((log) => log.workedHours)
                          .reduce((prev, next) => prev + next, 0)}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <th>Total Hours in this month</th>
                  <th>
                    {logData
                      .filter((log) => log.pId === project.id)
                      .map((log) => log.workedHours)
                      .reduce((prev, next) => prev + next, 0)}
                  </th>
                </tr>
              </table>
            </div>
          </div>
          <div>
            <h2>Training/Offboarding videos</h2>
            <div
              className='training-ctn'
              style={dashboard.theme === 'dark' ? { color: 'white', backgroundColor: 'black' } : {}}
            >
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 1 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 2 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 3 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 4 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 1 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 2 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 1 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 2 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 3 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 4 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 1 for the clients
              </a>
              <a href='https://youtube.com/#1' target='_blank' rel='noreferrer'>
                Training Video 2 for the clients
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardOnGoingPage;
