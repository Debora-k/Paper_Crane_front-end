import AdminHeader from 'components/Header/adminHeader';
import React, { useEffect } from 'react';
import { useState } from 'react';

import AdminNavbar from './admin.navbar';
import './admin.repo.page.css';
import FolderTreeContainer from 'components/folderTree/FolderTreeContainer';
import axios from 'axios';

const AdminRepository = () => {
  // Back up list of repositories incase call to backend doesn't work or undefined
  const backUpProjects = [
    { projectId: 1, pName: 'Project1' },
    { projectId: 2, pName: 'Project2' },
    { projectId: 3, pName: 'Project3' },
  ];
  const userId = sessionStorage.getItem("userId");
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/projects/user/" + userId, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
      }
    })
    .then(response => {
      setProjects(response.data);
      if (response.data[0] === undefined) { setProjects(backUpProjects); }
      console.log(response.data);
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
      <AdminHeader />
      <AdminNavbar />
      <div className='container'>
        <div className='repoProjectList'>{projectList}</div>
          <FolderTreeContainer repoName={selectedProject}/>
      </div>
    </div>
  );
};

export default AdminRepository;
