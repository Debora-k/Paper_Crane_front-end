import axios from 'axios';
import { AdminClientData } from 'dummyData/adminClientData';
import { AdminsData } from 'dummyData/adminData';
import { EmpData } from 'dummyData/empData';
import React, { createContext, useEffect, useState } from 'react';
import { DataContextType, admin, projectList } from 'types/projectDetails/projectDataTypes';

// import { EmpVideoData } from './dummyData/empVideoData';
// import { ProjectsVideoData } from './dummyData/projectsVideoData';
import { Projects as projectsData } from './dummyData/projectsData';
import { TimeOffRequests } from './dummyData/timeoffRequests';

export const DataContext = createContext<DataContextType | null>(null);

const SharedData: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any>();

  // temporary for testing until frontend has login
  useEffect(() => {
    axios
      .post('http://localhost:8080/authenticate', {
        email: 'admin1@email.com',
        password: '123456',
      })
      .then((results) => setUser(results.data))
      .catch((error) => {
        console.log(error);
        setUser({ email: 'dummy@gmail.com' });
      });
  }, []);

  const [admins, setAdmins] = useState<admin | null>(AdminsData);
  const [projects, setProjects] = useState<projectList | null>([]);
  const [timeOffData, setTimeOffData] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  // const [empVideoData, setEmpVideoData] = useState([]);
  // const [projectsVideoData, setProjectsVideoData] = useState([]);

  // // axios for getting projects' videos
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/api/v1/employees/')
  //     .then((results) => setEmployees(results.data))
  //     .catch((error) => {
  //       console.log(error);
  //       // in case back-end isn't connected to front-end, then display dummy data
  //       setEmployees(EmpData);
  //     });
  // }, []);

  // // axios for getting employees' videos
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/api/v1/employees/')
  //     .then((results) => setEmployees(results.data))
  //     .catch((error) => {
  //       console.log(error);
  //       // in case back-end isn't connected to front-end, then display dummy data
  //       setEmployees(EmpData);
  //     });
  // }, []);

  // axios for getting employees
  useEffect(() => {
    if (user === undefined) return;
    axios
      .get('http://localhost:8080/api/v1/employees/')
      .then((results) => setEmployees(results.data))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setEmployees(EmpData);
      });
  }, [user]);

  // axios for getting clients
  useEffect(() => {
    if (user === undefined) return;
    axios
      .get('http://localhost:8080/api/v1/clients/')
      .then((results) => setClients(results.data))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setClients(AdminClientData);
      });
  }, [user]);

  // axios for getting time-off requests
  useEffect(() => {
    if (user === undefined) return;
    axios
      .get('http://localhost:8080/api/v1/time_off_requests/')
      .then((results) => setTimeOffData(results.data))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setTimeOffData(TimeOffRequests);
      });
  }, [user]);

  // axios for getting projects list
  useEffect(() => {
    if (user === undefined) return;
    axios
      .get('http://localhost:8080/api/v1/projects/')
      .then((results) => setProjects(results.data))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setProjects(projectsData);
      });
  }, [user]);
  return (
    <DataContext.Provider
      value={{
        admins,
        setAdmins,
        projects,
        setProjects,
        timeOffData,
        setTimeOffData,
        clients,
        setClients,
        employees,
        setEmployees,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default SharedData;
