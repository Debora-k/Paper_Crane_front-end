import React from 'react';
import { Link } from 'react-router-dom';

import '../../components/progressbar/style.css';
import EmpNavbar from './emp.navbar';
import './emp.workinghours.page.css';

const EmpWorkingHours = () => {
  // Fake values for displaying rows in this page until back-end is ready
  const projects = [
    { projectId: 1, pName: 'Project1', workingHours: 10 },
    { projectId: 2, pName: 'Project2', workingHours: 25 },
    { projectId: 3, pName: 'Project3', workingHours: 40 },
  ];

  // listRows will contain the arrays below
  const listRows = [];
  // add project rows to the listRows
  for (let i = 0; i < projects.length; i++) {
    listRows.push(
      <div className='row'>
        {/* From "projectId" it leads to the right link */}
        <Link to={`/employee/projects/${projects[i].projectId}`}>{projects[i].pName}</Link>
        <p>{`You have been working on ${projects[i].pName} for ${projects[i].workingHours} hours`}</p>
      </div>,
    );
  }

  return (
    <div>
      {/* call employee navbar */}
      <EmpNavbar />
      <ul className='body'>{listRows}</ul>
    </div>
  );
};

export default EmpWorkingHours;
