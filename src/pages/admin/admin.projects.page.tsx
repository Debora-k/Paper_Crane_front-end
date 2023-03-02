

import ProjectRow from 'components/projectrow/ProjectRow';
import { data } from '../../projectsData';
import React from 'react';
import AdminNavbar from './admin.navbar';
import '../../components/progressbar/style.css';
import './admin.projects.page.css';
import Header from 'components/Header/Header';

export default function AdminProjects(props) {
  const projects = data;

  const listRows = projects.map((project) => {
    return (
      <ProjectRow
        id={project.id}
        title={project.title}
        description={project.description}
        status={project.status}
        key={project.id}
      />
    );
  });
  return (
    <>
    <Header/>
      <AdminNavbar />
      <div className='justify-center'>
        <ul className='content--container'>{listRows}</ul>
      </div>
    </>
  );
}

// AdminProjects.propTypes = {
//   handleClick: PropTypes.func
// }
