import PropTypes from 'prop-types';
import React from 'react';
import './taskrow.css'
export default function TaskRow(props) {
  function getProgress() {
    if (props.status === -1) return '#fff';
    else if (props.status === 1) return '#000';
    else if (props.status === 0) return '#B0B0B0';
  }
//   const statusStyle = {
//     backgroundColor: getProgress(),
//   };
  return (
    <div className='task'>
      <div className={`status-box`} style = {{backgroundColor: getProgress()}}></div>
      <div className='task-title'>{props.task}</div>
      <div className='assigned'>{props.assigned}</div>
    </div>
  );
}

TaskRow.propTypes = {
  task: PropTypes.string,
  status: PropTypes.number,
  assigned: PropTypes.string,
};
