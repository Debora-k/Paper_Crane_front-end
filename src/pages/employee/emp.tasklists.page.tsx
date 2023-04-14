import { gray } from '@ant-design/colors';
import { Select } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import EmpHeader from 'components/Header/empHeader';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Projects } from '../../dummyData/projectsData';
import Taskboard from '../../views/employee/tasklists/Taskboard';
import EmpNavbar from './emp.navbar';

const StyledLayout = styled(Layout)`
  background-color: white;
  /* We can't use "height: 100vh; width: 100vw;" here.
  Otherwise, when there is a horizontal scrollbar etc, 
  because that we set a constant height, there will be a vertical one too.  */
  position: absolute;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledContent = styled(Content)`
  background-color: ${gray.primary[1]};
`;

function EmpTaskLists() {
  const [selectedProject, setSelectedProject] = useState(Projects[0]);

  // axios for getting tasks
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/tasks/${selectedProject.id}/tasks`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
      })
      .then((results) => setSelectedProject({ ...selectedProject, tasks: results.data }))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setSelectedProject(selectedProject);
      });
  }, [selectedProject]);

  return (
    <div>
      <EmpHeader />
      <EmpNavbar />
      <StyledLayout>
        <StyledContent>
          <Select
            style={{ marginLeft: 75 }}
            defaultValue={Projects[0].id}
            onChange={(value: number) => {
              setSelectedProject(Projects.find((project) => project.id === value));
            }}
            options={Projects.map((project) => {
              return { value: project.id, label: project.pName };
            })}
          />
          <Taskboard tasks={selectedProject.tasks} selectedProject={selectedProject} />
        </StyledContent>
      </StyledLayout>
    </div>
  );
}

export default EmpTaskLists;
