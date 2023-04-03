import EmpHeader from 'components/Header/empHeader';
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useParams } from 'react-router-dom';

import EmpNavbar from './emp.navbar';
import './emp.workinghours.detail.page.css';

const EmpWorkingHoursDetail = () => {
  let { projectId } = useParams();
  //   fake data about project start date, deadline, and expected/estimated working hours
  const getProjectDetail = () => {
    return {
      projectId: projectId,
      pName: 'Project1',
      startDate: new Date('Feburary 25, 2023'),
      endDate: new Date('March 25, 2023'),
      estimatedHours: 60,
      currentWorkedHours: 30,
    };
  };
  return (
    <div>
      <EmpHeader />
      {/* call employee navbar */}
      <EmpNavbar />
      <div className='container'>
        <div className='firstColumn'>
          <div className='title'>{getProjectDetail().pName}</div>
          <p>{`Personal Working hours: `}</p>
          <p>{`Total Working hours: `}</p>
        </div>
        <div className='secondColumn'>
          <p className='projectInfo'>{`Start Date: ${getProjectDetail().startDate}`}</p>
          <p className='projectInfo'>{`End Date: ${getProjectDetail().endDate}`}</p>
          <p className='projectInfo'>
            {`Estimated Hours: ${getProjectDetail().estimatedHours} hours`}
          </p>
        </div>
        <div className='progressbar'>
          <CircularProgressbar
            value={
              (getProjectDetail().currentWorkedHours / getProjectDetail().estimatedHours) * 100
            }
            text={`${
              (getProjectDetail().currentWorkedHours / getProjectDetail().estimatedHours) * 100
            } %
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default EmpWorkingHoursDetail;
