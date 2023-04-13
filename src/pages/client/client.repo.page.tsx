import FolderTreeContainer from 'components/folderTree/FolderTreeContainer';
import React, { useEffect } from 'react';
import { useState } from 'react';

import ClientNavbar from './client.navbar';
import ClientHeader from 'components/Header/clientHeader';
import './client.repo.page.css';
import axios from 'axios';

const ClientRepository = () => {
  // Back up list of repositories incase call to backend doesn't work
  const backUpProjects = [
    { projectId: 1, pName: 'Project1' },
    { projectId: 2, pName: 'Project2' },
    { projectId: 3, pName: 'Project3' },
  ];
  const clientId = sessionStorage.getItem("userId");
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/projects/user/" + clientId, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
      }
    })
    .then(response => {
      setProjects(response.data);
      if (response.data[0] === undefined) { setProjects(backUpProjects); }
    })
    .catch(error => {
    })
  })

  const [projects, setProjects] = useState(backUpProjects);
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

          <FolderTreeContainer repoName={selectedProject}/>

      </div>
    </div>
  );
};

export default ClientRepository;
