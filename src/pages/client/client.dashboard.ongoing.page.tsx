import { DataContext } from 'SharedData';
import { Select, message } from 'antd';
import axios from 'axios';
import CheckPendingRequestModal from 'components/CheckPendingRequestModal/CheckPendingRequestModal';
import DashboardHeader from 'components/Header/dashboardHeader';
import SendRequestModal from 'components/SendRequestModal/SendRequestModal';
import { EmpLog } from 'dummyData/empLogData';
import { ProjectsVideoData } from 'dummyData/projectsVideoData';
import { Scopes } from 'dummyData/scopeData';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './client.dashboard.ongoing.page.css';

const ClientDashboardOnGoingPage = () => {
  // getting dashboards data from back-end
  const { dashboards, projects, setProjects } = useContext(DataContext);
  const { cId } = useParams();
  const [projectId, setProjectId] = useState<number>();
  const project = projects.find(
    (project) => project.cId === Number(cId) && (!projectId || project.id === projectId),
  );
  const dashboard = dashboards.find((dashboard) => dashboard.pId === project?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckPendingRequestModalOpen, setIsCheckPendingRequestModalOpen] = useState(false);
  const [logData] = useState(EmpLog);
  const [scopes, setScopes] = useState(Scopes);

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

  // axios for getting tasks
  useEffect(() => {
    if (project === undefined) {
      return;
    }
    axios
      .get(`http://localhost:8080/api/v1/tasks/${project.id}/tasks`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
      })
      .then((results) => {
        const projectsCopy = [...projects];
        projectsCopy[projects.indexOf(project)] = { ...project, tasks: results.data };
        setProjects(projectsCopy);
      })
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setProjects(projects);
      });
  }, [project, projects, setProjects]);

  if (project === undefined || dashboard === undefined) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: dashboard.theme === 'light' ? 'white' : 'black',
        color: dashboard.theme === 'dark' ? 'white' : 'black',
        fontSize: dashboard.fontSize,
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
        <h1>
          Dashboard{' '}
          <Select
            style={{ width: 160, marginLeft: 40 }}
            options={projects
              .filter((project) => project.cId === Number(cId))
              .map((project) => {
                return { value: project.id, label: project.pName };
              })}
            defaultValue={project.id}
            onChange={(value) => setProjectId(value)}
          />
        </h1>
        <div className='grid-ctn'>
          <div>
            <h2>Current Project</h2>
            <div className='project-ctn'>
              <h3>{project.pName}</h3>
              <p>Start Date: {project.startDate}</p>
              <p>Contract End Date: {project.endDate}</p>
            </div>
          </div>
          <div>
            <h2>Scopes</h2>
            <div className='project-ctn scope'>
              {scopes
                .filter((scope) => scope.pId === project.id)
                .map((scope, index) => (
                  <p key={index}>{scope.scopeName}</p>
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
              <Link to='/client/repository'>
                <button
                  className='primary__btn'
                  style={{
                    borderColor: dashboard.theme === 'dark' ? 'white' : 'black',
                  }}
                >
                  View Repository
                </button>
              </Link>
            </div>
          </div>
          <div>
            <h2>Past Project</h2>
            <div className='project-ctn projects'>
              {projects
                .filter((project) => project.endDate < new Date().toISOString().substring(0, 10))
                .map((project) => {
                  return (
                    <div className='project-ctn-item' key={project.id}>
                      <h3>{project.pName}</h3>
                      <p>Start Date: {project.startDate}</p>
                      <p>Contract End Date: {project.endDate}</p>
                    </div>
                  );
                })}
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
                {project.tasks.map((task) => {
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
            <h2>
              {project.endDate > new Date().toISOString().substring(0, 10)
                ? 'Training'
                : 'Offboarding'}{' '}
              Videos
            </h2>
            <div
              className='training-ctn'
              style={dashboard.theme === 'dark' ? { color: 'white', backgroundColor: 'black' } : {}}
            >
              {ProjectsVideoData.filter(
                (video) => video.projectId === project.id && video.type.includes('client'),
              ).map((video) => {
                return (
                  <div key={video.link}>
                    <a
                      href={video.link}
                      target='_blank'
                      rel='noreferrer'
                      style={dashboard.theme === 'dark' ? { color: 'white' } : {}}
                    >
                      {video.title}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardOnGoingPage;
