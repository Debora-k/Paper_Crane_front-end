import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';

import '../../components/progressbar/style.css';
import AdminNavbar from './admin.navbar';
import './admin.projects.page.css';

const AdminProjects = () => {
  const projectId = [1, 2, 3];
  // Fake values for displaying rows in this page until back-end is ready
  const projectNames = ['Project1', 'Project2', 'Project3'];
  const description = ['Brief Description', 'Brief Description', 'Brief Description'];
  const progressbar = [80, 30, 90];

  // listRows will contain the arrays below
  const listRows = [];
  // Thought if there are missing values, so created three for loops just in case
  for (let i = 0; i < projectNames.length; i++) {
    listRows.push(
      <div className='row'>
        {/* From "projectId" it leads to the right link */}
        <Link to={`/admin/projects/${projectId[i]}`}>{projectNames[i]}</Link>
        <p>{description[i]}</p>
        <div className='progressbar'>
          <CircularProgressbar value={progressbar[i]} text={`${progressbar[i]}%`} />
        </div>
      </div>,
    );
  }

  return (
    <div>
      {/* call admin navbar */}
      <AdminNavbar />
      <ul>{listRows}</ul>
    </div>
  );
};

export default AdminProjects;
