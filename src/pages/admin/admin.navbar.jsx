import React from 'react';
import { Link } from 'react-router-dom';

import './admin.navbar.css';

const AdminNavbar = () => {
  return (
    <div>
      <span>
        <Link to='/admin/projects'>Projects</Link>
      </span>
      <span>
        <Link to='/admin/video'>Video</Link>
      </span>
      <span>
        <Link to='/admin/repository'>Repository</Link>
      </span>
      <span>
        <Link to='/admin/calendar'>Calendar</Link>
      </span>
      <span>
        <Link to='/admin/employees'>Employees</Link>
      </span>
      <span>
        <Link to='/admin/clients'>Clients</Link>
      </span>
    </div>
  );
};
export default AdminNavbar;
