import React from 'react';
import { Link } from 'react-router-dom';

import './admin.navbar.css';

const AdminNavbar = () => {
  return (
    <div>
      <span className='page'>
        <Link to='/admin/projects'>Projects</Link>
      </span>
      <span className='page'>
        <Link to='/admin/video'>Video</Link>
      </span>
      <span className='page'>
        <Link to='/admin/repository'>Repository</Link>
      </span>
      <span className='page'>
        <Link to='/admin/calendar'>Calendar</Link>
      </span>
      <span className='page'>
        <Link to='/admin/employees'>Employees</Link>
      </span>
      <span className='page'>
        <Link to='/admin/clients'>Clients</Link>
      </span>
    </div>
  );
};
export default AdminNavbar;
