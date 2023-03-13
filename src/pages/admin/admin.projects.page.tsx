import { DataContext } from 'app';
import Header from 'components/Header/Header';
import ProjectRow from 'components/projectrow/ProjectRow';
import { useContext } from 'react';
import React from 'react';

import '../../components/progressbar/style.css';
import AdminNavbar from './admin.navbar';
import './admin.projects.page.css';

export default function AdminProjects(props) {
  const { projects } = useContext(DataContext);

  const listRows = projects.map((project) => {
    return (
      <ProjectRow
        id={project.id}
        title={project.title}
        description={project.description}
        status={project.status}
        key={project.id}
        tasks={project.tasks}
      />
    );
  });
  return (
    <>
      <Header />
      <AdminNavbar />
      <div className='justify-center'>
        <ul className='content--container'>{listRows}</ul>
      </div>
    </>
  );
}
