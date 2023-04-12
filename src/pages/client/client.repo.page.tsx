// import DragDropBox from 'components/dragDrop/dragDropBox.component';
import FolderTreeContainer from 'components/folderTree/FolderTreeContainer';
import React from 'react';
import { useState } from 'react';

import ClientNavbar from './client.navbar';
import ClientHeader from 'components/Header/clientHeader';
import './client.repo.page.css';

const ClientRepository = () => {
  // bring Database of projects with projects' names
  const projects = [
    { projectId: 1, pName: 'Project1' },
    { projectId: 2, pName: 'Project2' },
    { projectId: 3, pName: 'Project3' },
  ];

  const [selectedProject, setSelectedProject] = useState(projects[0].pName);

  // read the project list
  const projectList = projects.map((project) => {
    return (
      <div key={project.projectId} onClick={() => setSelectedProject(project.pName)}>
        <h3>{project.pName}</h3>
      </div>
    );
  });
  
  return (
    <div>
      <ClientHeader />
      <ClientNavbar />
      <div className='container'>
        <div className='repoProjectList'>{projectList}</div>
        <div className='uploadVideo'>
          <FolderTreeContainer repoName={selectedProject}/>
        </div>
      </div>
    </div>
  );
};

export default ClientRepository;
