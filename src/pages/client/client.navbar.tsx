import React from 'react';
import { Link } from 'react-router-dom';

import './client.navbar.css';

const ClientNavbar = () => {
  return (
    <div className='navBar'>
      <span className='page'>
        <Link to='/client/projects'>Projects</Link>
      </span>
      <span className='page'>
        <Link to='/client/repository'>Repository</Link>
      </span>
    </div>
  );
};
export default ClientNavbar;
