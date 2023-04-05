import EmpHeader from 'components/Header/empHeader';
// import { Scopes } from 'dummyData/scopeData';
import React from 'react';

import EmpNavbar from './emp.navbar';
import './emp.scope.requests.page.css';

const EmpScopeRequests = () => {
  return (
    <div>
      <EmpHeader />
      {/* call employee navbar */}
      <EmpNavbar />
      <ul className='body'></ul>
    </div>
  );
};

export default EmpScopeRequests;
