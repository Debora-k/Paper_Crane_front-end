import Header from 'components/Header/Header';
import React, { useState } from 'react';
import CreateEmpAccount from 'views/admin/createAccount/admin.emp.createAccount';
import EditEmpAccount from 'views/admin/editAccount/admin.emp.editAccount';

import './admin.emp.page.css';
import AdminNavbar from './admin.navbar';

/**
 * In the futuer, we will need to work on admin.emp.edit.page.jsx by clicking 'Edit' button
 *
 */
const AdminEmployees = () => {
  const [employees, setEmployees] = useState([
    // empId will be given automatically from back-end
    {
      empId: 1,
      firstName: 'Debora',
      lastName: 'Kwon',
      role: 'Developer',
      email: 'fake1@gmail.com',
    },
    {
      empId: 2,
      firstName: 'Parshant',
      lastName: 'Rehal',
      role: 'Developer',
      email: 'fake2@gmail.com',
    },
    { empId: 3, firstName: 'Marcus', lastName: 'Lau', role: 'Developer', email: 'fake3@gmail.com' },
    {
      empId: 4,
      firstName: 'Hashem',
      lastName: 'Al-Wadeai',
      role: 'Developer',
      email: 'fake4@gmail.com',
    },
    { empId: 5, firstName: 'Ben', lastName: 'Wood', role: 'Developer', email: 'fake5@gmail.com' },
    {
      empId: 6,
      firstName: 'Reece',
      lastName: 'Cheshire',
      role: 'Developer',
      email: 'fake6@gmail.com',
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<{
    empId: number;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
  }>();

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
          <button type='button' onClick={() => setSelectedEmployee(employees[i])}>
            Edit
          </button>
        </p>
        {/* delete button */}
        <p className='column'>
          <button
            type='button'
            onClick={() =>
              setEmployees((prevState) => {
                return prevState.filter((emp) => emp.empId !== employees[i].empId);
              })
            }
          >
            Delete
          </button>
        </p>
      </div>,
    );
  }

  return (
    <div>
      <Header />
      <AdminNavbar />
      <div className='container'>
        <ul>
          {columHeaders} {empRows}
        </ul>
        {selectedEmployee ? (
          <EditEmpAccount
            firstName={selectedEmployee.firstName}
            lastName={selectedEmployee.lastName}
            role={selectedEmployee.role}
            email={selectedEmployee.email}
            onCancel={() => setSelectedEmployee(undefined)}
          />
        ) : (
          <CreateEmpAccount />
        )}
      </div>
    </div>
  );
};

export default AdminEmployees;
