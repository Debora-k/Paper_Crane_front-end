/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import './projectrow.css'
export default function ProjectRow(props) {
  return (
    <div className='row'>
      <Link to={`/admin/project/${props.id}`} >
        {props.title}
      </Link>
      <p>{props.description}</p>
      <div className='progressbar'>
        <CircularProgressbar value={props.status} text={`${props.status}%`} />
      </div>
    </div>
  );
}

// ProjectRow.propTypes = {
//   handleClick: PropTypes.func,
// };
