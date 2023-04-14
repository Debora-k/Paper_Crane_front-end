import { DataContext } from 'SharedData';
import EmpHeader from 'components/Header/empHeader';
import { Scopes } from 'dummyData/scopeData';
import React, { useContext, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useParams } from 'react-router-dom';

import EmpNavbar from './emp.navbar';
import './emp.project.details.page.css';

const EmpProjectDetails = () => {
  let { projectId } = useParams();
  const { projects } = useContext(DataContext);
  const [scopes] = useState(Scopes);

  const selectedProject = projects.find((project) => project.id === Number(projectId));
  if (selectedProject === undefined) {
    return null;
  }
  return (
    <div>
      <EmpHeader />
      <EmpNavbar />
      <div className='container'>
        <div className='firstColumn'>
          <div className='title'>{selectedProject.pName}</div>
          <p>{`Worked hours: ${selectedProject.currentWorkedHours}`}</p>
          <p>{`Total Working hours: ${selectedProject.estimatedHours}`}</p>
          <div className='scopesContainer'>
            <h2>Scopes</h2>
            <div>
              {scopes
                .filter((scope) => scope.pId === selectedProject.id)
                .map((scope, index) => (
                  <p key={index}>{scope.scopeName}</p>
                ))}
            </div>
          </div>
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

export default EmpProjectDetails;
