import { gray } from '@ant-design/colors';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react';
import styled from 'styled-components';

import Taskboard from '../../views/employee/tasklists/Taskboard';
import EmpNavbar from './emp.navbar';

const StyledLayout = styled(Layout)`
  background-color: white;
  /* We can't use "height: 100vh; width: 100vw;" here.
  Otherwise, when there is a horizontal scrollbar etc, 
  because that we set a constant height, there will be a vertical one too.  */
  position: absolute;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledContent = styled(Content)`
  background-color: ${gray.primary[1]};
`;

function EmpTaskLists() {
  return (
    <div>
      <EmpNavbar />
      <StyledLayout>
        <StyledContent>
          <Taskboard />
        </StyledContent>
      </StyledLayout>
    </div>
  );
}

export default EmpTaskLists;
