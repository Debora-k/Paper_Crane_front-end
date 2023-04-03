// import admin pages
import { adminsData } from 'dummyData/adminData';
import AdminCalendar from 'pages/admin/admin.cal.page';
import AdminClients from 'pages/admin/admin.clients.page';
import AdminEmployees from 'pages/admin/admin.emp.page';
import AdminEmpWorkedHours from 'pages/admin/admin.emp.workedHours';
import AdminProjectDetails from 'pages/admin/admin.project.details.page';
import AdminProjects from 'pages/admin/admin.projects.page';
import AdminProposals from 'pages/admin/admin.proposals.page';
import AdminRepository from 'pages/admin/admin.repo.page';
import AdminRepoHistory from 'pages/admin/admin.repohistory.page';
import AdminVideo from 'pages/admin/admin.video.page';
// import employee pages
import EmpCalendar from 'pages/employee/emp.cal.page';
import EmpClients from 'pages/employee/emp.clients.page';
import EmpProjectDetails from 'pages/employee/emp.project.details.page';
import EmpProjects from 'pages/employee/emp.projects.page';
import EmpTaskLists from 'pages/employee/emp.tasklists.page';
import EmpVideo from 'pages/employee/emp.video.page';
import EmpWorkingHoursDetail from 'pages/employee/emp.workinghours.detail.page';
import EmpWorkingHours from 'pages/employee/emp.workinghours.page';
import AddAdmin from 'pages/superadmin/addAdmin.page';
import SuperAdmin from 'pages/superadmin/manageAdmin.page';
import React, { createContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataContextType, admin, project } from 'views/admin/tasklists/adminDataTypes';

import { data } from './dummyData/projectsData';

export const DataContext = createContext<DataContextType | null>(null);

export const App = () => {
  const [admins, setAdmins] = useState<admin | null>(adminsData);
  const [projects, setProjects] = useState<project | null>(data);

  return (
    <div className='App'>
      <DataContext.Provider value={{ admins, setAdmins, projects, setProjects }}>
        <BrowserRouter>
          <Routes>
            {/* Comment out few pages until working on it */}
            {/* <Route exact path='/login' element={<Login />}></Route> */}
            {/* <Route exact path='/client/projects' element={<ClientProjects />}></Route> */}
            {/* <Route exact path="/logout" element={<Logout />} /> </Route> */}

            {/* These routes are for admins */}
            <Route path='/admin/projects' element={<AdminProjects />}></Route>
            <Route path={`/admin/project/:projectid`} element={<AdminProjectDetails />}></Route>
            <Route path='/admin/video' element={<AdminVideo />}></Route>
            <Route path='/admin/proposals' element={<AdminProposals />}></Route>

            <Route path='/admin/repository' element={<AdminRepository />}></Route>
            <Route
              path='/admin/repository/repohistory/:projectId'
              element={<AdminRepoHistory />}
            ></Route>

            <Route path='/admin/employees' element={<AdminEmployees />}></Route>
            <Route
              path={`/admin/employees/:empId/workedhours`}
              element={<AdminEmpWorkedHours />}
            ></Route>
            <Route path='/admin/clients' element={<AdminClients />}></Route>
            <Route path='/admin/calendar' element={<AdminCalendar />}></Route>
            {/* path='*' is for temporary */}
            <Route path='*' element={<Navigate to='/admin/projects' />}></Route>

            {/* path for SuperAdmin pages */}
            <Route path='/superadmin/showadmins' element={<SuperAdmin />}></Route>
            <Route path='/superadmin/addadmin' element={<AddAdmin />}></Route>

            {/* path for Employee pages */}
            <Route path='/employee/projects' element={<EmpProjects />}></Route>
            <Route
              path='/employee/project/:projectId/details'
              element={<EmpProjectDetails />}
            ></Route>
            <Route path='/employee/video' element={<EmpVideo />}></Route>

            <Route path='/employee/tasklist' element={<EmpTaskLists />}></Route>
            <Route path='/employee/calendar' element={<EmpCalendar />}></Route>
            <Route path='/employee/workinghours' element={<EmpWorkingHours />}></Route>
            <Route
              path='/employee/workinghours/detail/:projectId'
              element={<EmpWorkingHoursDetail />}
            ></Route>
            <Route path='/employee/clients' element={<EmpClients />}></Route>
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
};
