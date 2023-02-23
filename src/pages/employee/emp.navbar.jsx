import React from 'react';
import { Link } from 'react-router-dom';

import './emp.navbar.css';

const EmpNavbar = () => {
  return (
    <div className='navBar'>
      <span className='page'>
        <Link to='/employee/projects'>Projects</Link>
      </span>
      <span className='page'>
        <Link to='/employee/taskLists'>Task Lists</Link>
      </span>
      <span className='page'>
        <Link to='/employee/workinghours'>Working Hours</Link>
      </span>
      <span className='page'>
        <Link to='/employee/calendar'>Calendar</Link>
      </span>
    </div>
  );
};
export default EmpNavbar;
