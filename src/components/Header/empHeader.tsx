import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import './header.css';

export default function EmpHeader() {
  return (
    <div className='header--container'>
      <Link to={'/'}>
        <div className='logo'>
          <img className='invertedLogo' src={Logo} alt='logo' width={'100px'} />
        </div>
      </Link>

      <div className='flex-row profile--container'>
        <button className='flex-row logout-btn'>Log Out</button>
        <button className='flex-row profile-btn'>
          <i className='fa-solid fa-user'></i>
        </button>
      </div>
    </div>
  );
}
