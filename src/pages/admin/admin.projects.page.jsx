import React from 'react';

import { SampleView } from 'views';

import AdminNavbar from './admin.navbar';

const AdminProjects = () => {
  return (
    <div>
      <AdminNavbar />
      <SampleView />
      <SampleView message={'This is admin projects page'} />
    </div>
  );
};

export default AdminProjects;
