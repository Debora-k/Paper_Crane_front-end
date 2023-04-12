import axios from 'axios';
import { adminsData } from 'dummyData/adminData';
import React, { createContext, useEffect, useState } from 'react';
import { DataContextType, admin, projectList } from 'types/projectDetails/projectDataTypes';

import { projects as projectsData } from './dummyData/projectsData';

export const DataContext = createContext<DataContextType | null>(null);

const SharedData: React.FC<any> = ({ children }) => {
  const [admins, setAdmins] = useState<admin | null>(adminsData);
  const [projects, setProjects] = useState<projectList | null>([]);

  // axios for getting projects list
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/projects/')
      .then((results) => setProjects(results.data))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setProjects(projectsData);
      });
  }, []);
  return (
    <DataContext.Provider value={{ admins, setAdmins, projects, setProjects }}>
      {children}
    </DataContext.Provider>
  );
};
export default SharedData;
