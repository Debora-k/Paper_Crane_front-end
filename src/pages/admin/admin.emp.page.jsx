import React from 'react';

import { SampleView } from 'views';

import AdminNavbar from './admin.navbar';

const AdminEmployees = () => {
  return (
    <div>
      <AdminNavbar />
      <SampleView />
      <SampleView message={'This is admin employees page'} />
    </div>
  );
};

export default AdminEmployees;
