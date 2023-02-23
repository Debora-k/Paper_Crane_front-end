// import admin pages
import AdminCalendar from 'pages/admin/admin.cal.page';
import AdminClients from 'pages/admin/admin.clients.page';
import AdminEmployees from 'pages/admin/admin.emp.page';
import AdminProjects from 'pages/admin/admin.projects.page';
import AdminRepository from 'pages/admin/admin.repo.page';
import AdminRepoHistory from 'pages/admin/admin.repohistory.page';
import AdminVideo from 'pages/admin/admin.video.page';
import AdminVideoHistory from 'pages/admin/admin.videohistory.page';
// import employee pages
import EmpCalendar from 'pages/employee/emp.cal.page';
import EmpProjects from 'pages/employee/emp.projects.page';
import EmpTaskLists from 'pages/employee/emp.tasklists.page';
import EmpWorkingHours from 'pages/employee/emp.workinghours.page';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Comment out few pages until working on it */}
        {/* <Route exact path='/login' element={<Login />}></Route> */}
        {/* <Route exact path='/client/projects' element={<ClientProjects />}></Route> */}
        {/* <Route exact path="/logout" element={<Logout />} /> </Route> */}

        {/* These routes are for admins */}
        <Route exact path='/admin/projects' element={<AdminProjects />}></Route>
        {/* project urls, need more work*/}
        <Route exact path='/admin/projects/:projectId' element={<AdminProjects />}></Route>
        <Route exact path='/admin/video' element={<AdminVideo />}></Route>
        <Route
          exact
          path='/admin/video/videohistory/:projectId'
          element={<AdminVideoHistory />}
        ></Route>

        <Route exact path='/admin/repository' element={<AdminRepository />}></Route>
        <Route
          exact
          path='/admin/repository/repohistory/:projectId'
          element={<AdminRepoHistory />}
        ></Route>

        <Route exact path='/admin/employees' element={<AdminEmployees />}></Route>
        {/* <Route exact path='/admin/employees/:empId/edit' element={< />}></Route> */}
        <Route exact path='/admin/clients' element={<AdminClients />}></Route>
        {/* <Route exact path='/admin/clients/:clientId/edit' element={</>}></Route> */}
        <Route exact path='/admin/calendar' element={<AdminCalendar />}></Route>
        {/* path='*' is for temporary */}
        <Route path='*' element={<Navigate to='/admin/projects' />}></Route>

        {/* path for Employee pages */}
        <Route exact path='/employee/projects' element={<EmpProjects />}></Route>
        <Route exact path='/employee/empTaskLists' element={<EmpTaskLists />}></Route>
        <Route exact path='/employee/calendar' element={<EmpCalendar />}></Route>
        <Route exact path='/employee/workinghours' element={<EmpWorkingHours />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
