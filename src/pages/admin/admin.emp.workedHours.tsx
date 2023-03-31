import AdminHeader from 'components/Header/adminHeader';
import { AdminEmpData } from 'dummyData/adminEmpData';
import { AdminEmpDetailedWorkedHours } from 'dummyData/adminEmpDetailedWorkedHours';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './admin.emp.workedHours.css';
import AdminNavbar from './admin.navbar';

const AdminEmpWorkedHours = () => {
  const [workedHours] = useState(AdminEmpDetailedWorkedHours);
  const [employees] = useState(AdminEmpData);
  const { empId } = useParams();
  const employee = employees.find((emp) => emp.empId === Number(empId));

  const listrows = workedHours.map((item) => {
    return (
      <div key={item.date}>
        {item.date} {item.hours} hours
      </div>
    );
  });

  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <div className='empWorkedHoursContainer'>
        <div className='empWorkedHoursDetails'>
          {employee.firstName} {employee.lastName} has been working in this month for{' '}
          {employee.workedHours} hours
        </div>
        <div>{listrows}</div>
      </div>
    </div>
  );
};

export default AdminEmpWorkedHours;
