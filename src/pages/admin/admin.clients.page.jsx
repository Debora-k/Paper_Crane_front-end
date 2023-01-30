import React from 'react';

import { SampleView } from 'views';

import AdminNavbar from './admin.navbar';

const AdminClients = () => {
  return (
    <div>
      <AdminNavbar />
      <SampleView />
      <SampleView message={'This is admin clients page'} />
    </div>
  );
};

export default AdminClients;
