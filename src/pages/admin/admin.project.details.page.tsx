import { DataContext } from 'SharedData';
import AdminHeader from 'components/Header/adminHeader';
import React, { useContext } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useParams } from 'react-router-dom';

import AdminNavbar from './admin.navbar';
import './admin.project.details.page.css';

const AdminProjectDetails = () => {
  let { projectId } = useParams();
  const { projects } = useContext(DataContext);

  const selectedProject = projects.find((project) => project.id === Number(projectId));
  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <div className='container'>
        <div className='firstColumn'>
          <div className='title'>{selectedProject.pName}</div>
          <p>{`Worked hours: ${selectedProject.currentWorkedHours}`}</p>
          <p>{`Total Working hours: ${selectedProject.estimatedHours}`}</p>
        </div>
        <div className='secondColumn'>
          <p className='projectInfo'>{`Start Date: ${selectedProject.startDate}`}</p>
          <p className='projectInfo'>{`End Date: ${selectedProject.endDate}`}</p>
          <p className='projectInfo'>
            {`Estimated Hours: ${selectedProject.estimatedHours} hours`}
          </p>
        </div>
        <div className='progressbar'>
          <CircularProgressbar
            value={(selectedProject.currentWorkedHours / selectedProject.estimatedHours) * 100}
            text={`
              ${(selectedProject.currentWorkedHours / selectedProject.estimatedHours) * 100} %
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProjectDetails;
