import axios from 'axios';
import { AdminClientData } from 'dummyData/adminClientData';
import { AdminsData } from 'dummyData/adminData';
import { ClientDashboards } from 'dummyData/clientDashboards';
import { EmpData } from 'dummyData/empData';
import React, { createContext, useEffect, useState } from 'react';
import { DataContextType, admin, projectList } from 'types/projectDetails/projectDataTypes';

// import { EmpVideoData } from './dummyData/empVideoData';
// import { ProjectsVideoData } from './dummyData/projectsVideoData';
import { Projects as projectsData } from './dummyData/projectsData';
import { TimeOffRequests } from './dummyData/timeoffRequests';

export const DataContext = createContext<DataContextType | null>(null);

const SharedData: React.FC<any> = ({ children }) => {
  const [admins, setAdmins] = useState<admin | null>(AdminsData);
  const [projects, setProjects] = useState<projectList | null>([]);
  const [timeOffData, setTimeOffData] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [dashboards, setDashboards] = useState([]);
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

  // axios for getting clients' dashboards
  useEffect(() => {
    axios
      // /dashboards does not exist yet on back-end
      .get('http://localhost:8080/api/v1/dashboards/')
      .then((results) => setDashboards(results.data))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setDashboards(ClientDashboards);
      });
  }, []);

  // axios for getting employees
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/employees/', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      })
      .then((results) => setEmployees(results.data))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setEmployees(EmpData);
      });
  }, []);

  // axios for getting clients
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/clients/', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      })
      .then((results) => setClients(results.data))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setClients(AdminClientData);
      });
  }, []);

  // axios for getting time-off requests
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/time_off_requests/', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      })
      .then((results) => setTimeOffData(results.data))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setTimeOffData(TimeOffRequests);
      });
  }, []);

  // axios for getting projects list
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/projects/', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      })
      .then((results) => setProjects(results.data))
      .catch((error) => {
        console.log(error);
        // in case back-end isn't connected to front-end, then display dummy data
        setProjects(projectsData);
      });
  }, []);
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
        dashboards,
        setDashboards,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default SharedData;
