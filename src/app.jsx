import AdminCalendar from 'pages/admin/admin.cal.page';
import AdminClients from 'pages/admin/admin.clients.page';
import AdminEmployees from 'pages/admin/admin.emp.page';
import AdminProjects from 'pages/admin/admin.projects.page';
import AdminRepository from 'pages/admin/admin.repo.page';
import AdminVideo from 'pages/admin/admin.video.page';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Comment out few pages until working on it */}
        {/* <Route exact path='/login' element={<Login />}></Route> */}
        {/* <Route exact path='/employee/projects' element={<EmployeeProjects />}></Route> */}
        {/* <Route exact path='/client/projects' element={<ClientProjects />}></Route> */}

        {/* These routes are for admins */}
        <Route exact path='/admin/projects' element={<AdminProjects />}></Route>
        {/* project urls, need more work*/}
        <Route exact path='/admin/projects/:projectId' element={<AdminProjects />}></Route>
        <Route exact path='/admin/video' element={<AdminVideo />}></Route>
        <Route exact path='/admin/repository' element={<AdminRepository />}></Route>
        <Route exact path='/admin/employees' element={<AdminEmployees />}></Route>
        <Route exact path='/admin/clients' element={<AdminClients />}></Route>
        <Route exact path='/admin/calendar' element={<AdminCalendar />}></Route>
        {/* path='*' is for temporary */}
        <Route path='*' element={<Navigate to='/admin/projects' />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
