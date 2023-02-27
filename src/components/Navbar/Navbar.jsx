import React from 'react';
import { NavLink } from 'react-router-dom';

import './navbar.css';

const Navbar = () => {
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
export default Navbar;
