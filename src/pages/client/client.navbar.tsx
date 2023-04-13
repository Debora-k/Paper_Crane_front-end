import React from 'react';
import { NavLink } from 'react-router-dom';

import './client.navbar.css';

const ClientNavbar = () => {
  return (
    <div className='ClientNavBar'>
      <NavLink to='/client/dashboard/non-ongoing'>&lt; Back</NavLink>
    </div>
  );
};
export default ClientNavbar;
