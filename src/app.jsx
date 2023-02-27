import { adminsData } from 'adminData';
import AdminCalendar from 'pages/admin/admin.cal.page';
import AdminClients from 'pages/admin/admin.clients.page';
import AdminEmployees from 'pages/admin/admin.emp.page';
import { ProjectDetails } from 'pages/admin/admin.project.details.page';
import AdminProjects from 'pages/admin/admin.projects.page';
import AdminRepository from 'pages/admin/admin.repo.page';
import AdminRepoHistory from 'pages/admin/admin.repohistory.page';
import AdminVideo from 'pages/admin/admin.video.page';
import AdminVideoHistory from 'pages/admin/admin.videohistory.page';
import SuperAdmin from 'pages/superadmin/admins.page';
import AddAdmin from 'pages/superadmin/manageAdmin.page';
import { React, createContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const AdminContext = createContext();
export const App = () => {
  const [admins, setAdmins] = useState(adminsData);
  const [currId, setCurrId] = useState('*');
  function handleClick(id) {
    setCurrId(id);
  }
  return (
    <div className='App'>
      <AdminContext.Provider value={{ admins, setAdmins }}>
        <BrowserRouter>
          <Routes>
            {/* Comment out few pages until working on it */}
            {/* <Route exact path='/login' element={<Login />}></Route> */}
            {/* <Route exact path='/employee/projects' element={<EmployeeProjects />}></Route> */}
            {/* <Route exact path='/client/projects' element={<ClientProjects />}></Route> */}
            {/* <Route exact path="/logout" element={<Logout />} /> </Route> */}

            {/* These routes are for admins */}
            <Route
              exact
              path='/admin/projects'
              element={<AdminProjects handleClick={handleClick} />}
            ></Route>
            <Route
              exact
              path={`/admin/project/:projectid`}
              element={<ProjectDetails id={currId} />}
            ></Route>
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
            <Route exact path='/superadmin/showadmins' element={<SuperAdmin />}></Route>
            <Route exact path='/superadmin/addadmin' element={<AddAdmin />}></Route>
            {/* path='*' is for temporary */}

            <Route path='*' element={<Navigate to='/admin/projects' />}></Route>
          </Routes>
        </BrowserRouter>
      </AdminContext.Provider>
    </div>
  );
};
