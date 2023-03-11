/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import { task } from 'views/admin/tasklists/adminDataTypes';



import './projectrow.css';


interface ProjectRowPropType {
  id: Number;
  title: string;
  description: string;
  status: string;
  tasks: task[];
}
export default function ProjectRow({ id, title, description, status, tasks }: ProjectRowPropType) {
  const getProgress = () => {
    let count = 0;
    tasks.forEach(taskData=>{
      if(taskData.status === 1){
        count = count + 1;
      }
      else if(taskData.status === 0){
        count = count + 0.5;
      }
    })
    const progress = Math.floor((count/tasks.length)*100);
    return progress;

  };
  return (
    <div className='row'>
      <Link to={`/admin/project/${id}`}>{title}</Link>
      <p>{description}</p>
      <div className='progressbar'>
        <CircularProgressbar value={getProgress()} text={`${getProgress()}%`} />
      </div>
    </div>
  );
}
