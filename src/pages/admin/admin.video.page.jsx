import React from 'react';

import { SampleView } from 'views';

import AdminNavbar from './admin.navbar';

const AdminVideo = () => {
  return (
    <div>
      <AdminNavbar />
      <SampleView />
      <SampleView message={'This is admin video page'} />
    </div>
  );
};

export default AdminVideo;
