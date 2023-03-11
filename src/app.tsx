// import admin pages
import { adminsData } from 'adminData';
import {data} from './projectsData'
import AdminCalendar from 'pages/admin/admin.cal.page';
import AdminClients from 'pages/admin/admin.clients.page';
import AdminEmployees from 'pages/admin/admin.emp.page';
import { ProjectDetails } from 'pages/admin/admin.project.details.page';
import AdminProjects from 'pages/admin/admin.projects.page';
import AdminRepository from 'pages/admin/admin.repo.page';
import AdminRepoHistory from 'pages/admin/admin.repohistory.page';
import AdminVideo from 'pages/admin/admin.video.page';
import AdminVideoHistory from 'pages/admin/admin.videohistory.page';
// import employee pages
import EmpCalendar from 'pages/employee/emp.cal.page';
import EmpProjects from 'pages/employee/emp.projects.page';
import EmpTaskLists from 'pages/employee/emp.tasklists.page';
import EmpWorkingHoursDetail from 'pages/employee/emp.workinghours.detail.page';
import EmpWorkingHours from 'pages/employee/emp.workinghours.page';
import AddAdmin from 'pages/superadmin/addAdmin.page';
import SuperAdmin from 'pages/superadmin/manageAdmin.page';
import React, { createContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataContextType, admin, project } from 'views/admin/tasklists/adminDataTypes';

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
          <Route
            path='/admin/projects'
            element={<AdminProjects/>}
            ></Route>
          <Route
            path={`/admin/project/:projectid`}
            element={<ProjectDetails />}
            ></Route>
          <Route path='/admin/video' element={<AdminVideo />}></Route>
          <Route
            path='/admin/video/videohistory/:projectId'
            element={<AdminVideoHistory />}
            ></Route>

          <Route path='/admin/repository' element={<AdminRepository />}></Route>
          <Route
            path='/admin/repository/repohistory/:projectId'
            element={<AdminRepoHistory />}
            ></Route>

          <Route path='/admin/employees' element={<AdminEmployees />}></Route>
          {/* <Route exact path='/admin/employees/:empId/edit' element={< />}></Route> */}
          <Route path='/admin/clients' element={<AdminClients />}></Route>
          {/* <Route exact path='/admin/clients/:clientId/edit' element={</>}></Route> */}
          <Route path='/admin/calendar' element={<AdminCalendar />}></Route>
          {/* path='*' is for temporary */}
          <Route path='*' element={<Navigate to='/admin/projects' />}></Route>
          <Route path='/superadmin/showadmins' element={<SuperAdmin />}></Route>
          <Route path='/superadmin/addadmin' element={<AddAdmin />}></Route>
          {/* path for Employee pages */}
          <Route path='/employee/projects' element={<EmpProjects />}></Route>
          <Route path='/employee/taskLists' element={<EmpTaskLists />}></Route>
          <Route path='/employee/calendar' element={<EmpCalendar />}></Route>
          <Route path='/employee/workinghours' element={<EmpWorkingHours />}></Route>
          <Route
            path='/employee/workinghours/detail/:projectId'
            element={<EmpWorkingHoursDetail />}
            ></Route>
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
    </div>
  );
};