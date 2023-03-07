// import { data } from 'projectsData';
import Header from 'components/Header/Header';
import TaskRow from 'components/taskrow/TaskRow';

import PropTypes from 'prop-types';
import React from 'react';

import AdminNavbar from './admin.navbar';
import './admin.project.details.page.css';

export const ProjectDetails = (props) => {
  // const details = data.map((item) => {
  //   if (item.id === props.id) return item;
  // })

  const data = {
    id: 1,
    title: 'Project1',
    description: 'Project 1',
    status: '80',
    client: 'asdf1',
    dueDate: '01-10-23',
    repository: 'asdfghhj1',
    tasks: [
      {
        task: 'task 1',
        done: 1,
        assigned: 'parshant',
      },
      {
        task: 'task 2',
        done: 0,
        assigned: 'parshant',
      },
      {
        task: 'task 3',
        done: 0,
        assigned: 'parshant',
      },
      {
        task: 'task 4',
        done: -1,
        assigned: 'parshant',
      },
      {
        task: 'task 5',
        done: -1,
        assigned: 'parshant',
      },
      {
        task: 'task 6',
        done: 1,
        assigned: 'parshant',
      },
    ],
  };

  // const [projectDetails, setProjectDetails] = useState(data);
  // function onKeyStoke(){
  // setProjectDetails()
  // }

  const tasks = data.tasks.map((task, index) => {
    return <TaskRow task={task.task} status={task.done} assigned={task.assigned} key={index} />;
  });
  return (
    <>
      <Header />
      <AdminNavbar />
      <div className='details--container justify-center'>
        <div className='profile--details'>
          <div className='projectTitle'>{data.title}</div>
          <div className='clientDetails'>
            <div className='clientName'>Client: {data.client}</div>
            <div className='dueDate'>Due Date: {data.dueDate}</div>
          </div>
        </div>
        <div className='task-container'>
          <div className='task'>
            <div></div>
            <div className='task-title heading'>Task List</div>
            <div className='assigned heading'>Who is assigned</div>
          </div>
          {tasks}
        </div>
      </div>
    </>
  );
};

ProjectDetails.propTypes = {
  id: PropTypes.string,
};
