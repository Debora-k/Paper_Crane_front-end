import React from 'react';

import { SampleView } from 'views';

import AdminNavbar from './admin.navbar';

const AdminRepository = () => {
  return (
    <div>
      <AdminNavbar />
      <SampleView />
      <SampleView message={'This is admin repository page'} />
    </div>
  );
};

export default AdminRepository;
