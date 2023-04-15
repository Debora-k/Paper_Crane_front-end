import React from 'react';
import { NavLink } from 'react-router-dom';

import './client.navbar.css';

const ClientNavbar = () => {
  const cId = '/client/dashboard/' + sessionStorage.getItem("cId");
  return (
    <div className='ClientNavBar'>
      <NavLink to={cId}>&lt; Back</NavLink>
    </div>
  );
};
export default ClientNavbar;
