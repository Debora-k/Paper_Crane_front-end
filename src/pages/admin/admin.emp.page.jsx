import CreateEmpAccount from 'components/createAccount/admin.emp.createAccount';
import React from 'react';
import { Link } from 'react-router-dom';

import './admin.emp.page.css';
import AdminNavbar from './admin.navbar';

/**
 * In the futuer, we will need to work on admin.emp.edit.page.jsx by clicking 'Edit' button
 *
 */
const AdminEmployees = () => {
  const employees = [
    // empId will be given automatically from back-end
    { empId: 1, firstName: 'Debora', lastName: 'Kwon', role: 'Developer' },
    { empId: 2, firstName: 'Parshant', lastName: 'Rehal', role: 'Developer' },
    { empId: 3, firstName: 'Marcus', lastName: 'Lau', role: 'Developer' },
    { empId: 4, firstName: 'Hashem', lastName: 'Al-Wadeai', role: 'Developer' },
    { empId: 5, firstName: 'Ben', lastName: 'Wood', role: 'Developer' },
    { empId: 6, firstName: 'Reece', lastName: 'Cheshire', role: 'Developer' },
  ];
  // column headers for employees list
  const columHeaders = [
    <div key='headers' className='empRows'>
      <p className='columnHeader'>ID</p>
      <p className='columnHeader'>First Name</p>
      <p className='columnHeader'>Last Name</p>
      <p className='columnHeader'>Role</p>
      {/* this empty p is for 'Edit' buttons' column header */}
      <p className='column'></p>
    </div>,
  ];

  // empRows will contain the employee arrays below
  const empRows = [];
  // add employee rows to the empRows
  for (let i = 0; i < employees.length; i++) {
    empRows.push(
      <div className='empRows'>
        <p className='column'>{employees[i].empId}</p>

        <p className='column'>{employees[i].firstName}</p>

        <p className='column'>{employees[i].lastName} </p>

        <p className='column'>{employees[i].role}</p>
        {/* edit button */}
        <p className='column'>
          <Link to={`/admin/employees/${employees[i].empId}/edit`}>
            <button type='button'>Edit</button>
          </Link>
        </p>
      </div>,
    );
  }

  return (
    <div>
      <AdminNavbar />
      <div className='container'>
        <ul>
          {columHeaders} {empRows}
        </ul>
        <CreateEmpAccount />
      </div>
    </div>
  );
};

export default AdminEmployees;
