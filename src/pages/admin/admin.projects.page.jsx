import Header from 'components/Header/Header';
import Navbar from 'components/Navbar/Navbar';
import ProjectRow from 'components/projectrow/ProjectRow';
import { data } from 'projectsData';
import { React } from 'react';

import '../../components/progressbar/style.css';
import './admin.projects.page.css';

export default function AdminProjects(props) {
  const projects = data;
  console.log(data);

  const listRows = projects.map((project) => {
    return (
      <ProjectRow
        id={project.id}
        title={project.title}
        description={project.description}
        status={project.status}
        // handleClick = {props.handleClick}
        key={project.id}
      />
    );
  });
  return (
    <>
      <Header />
      <Navbar />
      <div className='container'>
        <ul className='content--container'>{listRows}</ul>
      </div>
    </>
  );
}

// AdminProjects.propTypes = {
//   handleClick: PropTypes.func
// }
