import { Button, Modal, Select } from 'antd';
import Header from 'components/Header/Header';
import UploadVideo from 'components/uploadVideo/selectFile.component';
import VideoCard from 'components/videoCard/videoCard';
import React from 'react';
import { useState } from 'react';

import { empVideoData } from '../../dummyData/empVideoData';
import { projectsVideoData } from '../../dummyData/projectsVideoData';
import AdminNavbar from './admin.navbar';
import './admin.video.page.css';

const AdminVideo = () => {
  // bring Database of projects with projects' names
  const projects = [
    { projectId: 1, pName: 'Project1' },
    { projectId: 2, pName: 'Project2' },
    { projectId: 3, pName: 'Project3' },
  ];
  // choose an option from a dropbox of employee types
  // employees mean all employees can see the video list
  const [data, setData] = useState(empVideoData);
  const handleChange = (value) => {
    if (value === 'developers') {
      setData(empVideoData.filter((devVideoData) => devVideoData.type.includes('developers')));
    } else if (value === 'designers') {
      setData(
        empVideoData.filter((designerVideoData) => designerVideoData.type.includes('designers')),
      );
    } else if (value === 'employees') {
      setData(
        empVideoData.filter(
          (empVideoData) =>
            empVideoData.type.includes('developers') && empVideoData.type.includes('designers'),
        ),
      );
    }
  };
  // handleProjectChange is for the project dropdown (first displayed one)
  const [selectedProjectId, setSelectedProjectId] = useState();
  const handleProjectChange = (value) => {
    setSelectedProjectId(value);
    setData(
      projectsVideoData.filter((projectsEmpVideoData) => projectsEmpVideoData.projectId === value),
    );
  };

  // handleClientVideo is for the project-client dropdown
  // after choosing one project from first dropdown

  const handleProjectVideo = (value) => {
    setData(
      projectsVideoData.filter(
        (clientVideoData) =>
          clientVideoData.projectId === selectedProjectId && clientVideoData.type.includes(value),
      ),
    );
  };
  const videoList = data.map((videoData) => {
    return (
      <VideoCard
        key={videoData.link}
        title={videoData.title}
        description={videoData.description}
        type={videoData.type}
        link={videoData.link}
        cover={videoData.cover}
      />
    );
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleUpload = () => {
    setIsModalOpen(false);
    // uploading the new video here
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />
      <AdminNavbar />
      <div className='buttonBar'>
        {/* Dropdown options for projects */}
        <Select
          defaultValue={projects[0].projectId}
          options={projects.map((project) => ({ value: project.projectId, label: project.pName }))}
          style={{ width: 200, marginRight: 15 }}
          onChange={handleProjectChange}
        ></Select>
        {/* Dropdown options for a selected project */}
        {selectedProjectId && (
          <Select
            defaultValue='client'
            options={[
              { value: 'client', label: 'Client' },
              { value: 'emp', label: 'Employee' },
            ]}
            style={{ width: 200, marginRight: 15 }}
            onChange={handleProjectVideo}
          ></Select>
        )}
        /{/* Dropdown options for employees */}
        <Select
          defaultValue={'Employees'}
          options={[
            { value: 'developers', label: 'Developers' },
            { value: 'designers', label: 'Designers' },
            { value: 'employees', label: 'Employees' },
          ]}
          style={{ width: 200, marginLeft: 15 }}
          onChange={handleChange}
        ></Select>
        {/* add button for uploading a video */}
        <Button
          style={{ backgroundColor: 'black', color: 'white', float: 'right' }}
          onClick={showModal}
        >
          Add
        </Button>
        {/* a popup after clicking Add button */}
        <Modal
          title='Upload a training video'
          open={isModalOpen}
          onOk={handleUpload}
          onCancel={handleCancel}
          footer={[
            <Button key='cancel' onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key='upload'
              onClick={handleUpload}
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              Upload
            </Button>,
          ]}
        >
          <UploadVideo />
        </Modal>
      </div>
      <div className='videoList'>{videoList}</div>
      <div className='container'>
        <div className='uploadVideo'></div>
      </div>
    </div>
  );
};

export default AdminVideo;
