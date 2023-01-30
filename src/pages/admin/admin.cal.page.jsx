import React from 'react';

import { SampleView } from 'views';

import AdminNavbar from './admin.navbar';

const AdminCalendar = () => {
  return (
    <div>
      <AdminNavbar />
      <SampleView />
      <SampleView message={'This is admin calendar page'} />
    </div>
  );
};

export default AdminCalendar;
