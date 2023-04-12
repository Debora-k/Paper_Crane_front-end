import React from 'react';
import { NavLink } from 'react-router-dom';

import './admin.navbar.css';

const AdminNavbar = () => {
  return (
    <div className='AdminNavBar'>
      <NavLink to='/admin/projects'>Projects</NavLink>
      <NavLink to='/admin/video'>Video</NavLink>
      <NavLink to='/admin/repository'>Repository</NavLink>
      <NavLink to='/admin/calendar'>Calendar</NavLink>
      <NavLink to='/admin/employees'>Employees</NavLink>
      <NavLink to='/admin/clients'>Clients</NavLink>
    </div>
  );
};
export default AdminNavbar;
