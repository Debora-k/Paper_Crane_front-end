import { DataContext } from 'SharedData';
import AdminHeader from 'components/Header/adminHeader';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateEmpAccount from 'views/admin/createAccount/admin.emp.createAccount';
import EditEmpAccount from 'views/admin/editAccount/admin.emp.editAccount';

import './admin.emp.page.css';
import AdminNavbar from './admin.navbar';

const AdminEmployees = () => {
  const { employees, setEmployees } = useContext(DataContext);

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
      <p className='columnHeaderSmall'>ID</p>
      <p className='empColumnHeader'>First Name</p>
      <p className='empColumnHeader'>Last Name</p>
      <p className='empColumnHeader'>Role</p>
      <p className='empColumnHeader'>Worked Hours</p>
      {/* these empty p are for 'buttons' column header */}
      <p className='empButtonColumn'></p>
      <p className='empButtonColumn'></p>
      <p className='empButtonColumn'></p>
    </div>,
  ];

  // empRows will contain the employee arrays below
  const empRows = [];
  // add employee rows to the empRows
  for (let i = 0; i < employees.length; i++) {
    empRows.push(
      <div className='empRows'>
        <p className='empButtonColumn'>{employees[i].empId}</p>

        <p className='empColumn'>{employees[i].firstName}</p>

        <p className='empColumn'>{employees[i].lastName} </p>

        <p className='empColumn'>{employees[i].role}</p>

        <p className='empColumn'>{employees[i].workedHours}</p>

        <p className='empButtonColumn'>
          <Link to={`/admin/employees/${employees[i].empId}/workedhours`}>
            <button type='button'>View</button>
          </Link>
        </p>
        {/* edit button */}
        <p className='empButtonColumn'>
          <button type='button' onClick={() => setSelectedEmployee(employees[i])}>
            Edit
          </button>
        </p>
        {/* delete button */}
        <p className='empButtonColumn'>
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
      <AdminHeader />
      <AdminNavbar />
      <div className='containerAdminEmp'>
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
