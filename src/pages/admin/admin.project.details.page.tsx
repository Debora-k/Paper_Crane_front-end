import { EditOutlined } from '@ant-design/icons';
import { DataContext } from 'app';
import Header from 'components/Header/Header';
import AddTask from 'components/addTask/addTask';
import TaskRow from 'components/taskrow/TaskRow';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailboardItemFormModal from 'views/admin/tasklists/admin.detailsEditForm';
import TaskboardItemFormModal from 'views/admin/tasklists/admin.taskEditForm';
import { project, task } from 'views/admin/tasklists/adminDataTypes';
import { ProjectDetail } from 'views/admin/tasklists/adminModatTypes';

import AdminNavbar from './admin.navbar';
import './admin.project.details.page.css';

export const ProjectDetails = (props) => {
  const { projectid } = useParams();
  const { projects, setProjects } = useContext(DataContext);
  let curr_project = projects.filter((project) => project.id === Number(projectid));
  const [curr_task_id, SetCurr_Task_Id] = useState<number | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<task | null>(null);
  const [ProjectDetailsToEdit, setProjectDetailsToEdit] = useState<ProjectDetail | null>(null);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  const openTaskItemModal = (itemToEdit: task, id: number) => {
    SetCurr_Task_Id(id);
    setTaskToEdit(itemToEdit);
    setIsTaskModalVisible(true);
  };
  const closeTaskItemModal = () => {
    setTaskToEdit(null);
    setIsTaskModalVisible(false);
  };

  const openDetailsModal = (ProjectDetailsToEdit: project) => {
    const itemToEdit: ProjectDetail = {
      id: ProjectDetailsToEdit[0].id,
      title: ProjectDetailsToEdit[0].title,
      description: ProjectDetailsToEdit[0].description,
      status: ProjectDetailsToEdit[0].status,
      client: ProjectDetailsToEdit[0].client,
      dueDate: ProjectDetailsToEdit[0].dueDate,
      repository: ProjectDetailsToEdit[0].repository,
    };
    setProjectDetailsToEdit(itemToEdit);
    setIsDetailsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setProjectDetailsToEdit(null);
    setIsDetailsModalVisible(false);
  };
  const updateTaskList = (values) => {
    if (taskToEdit !== null) {
      const updated_tasks: task[] = curr_project[0].tasks.map((task) => {
        return task.id !== curr_task_id
          ? task
          : {
              id: values.id,
              assigned: values.assigned,
              status: values.status,
              task: values.task,
            };
      });
      setProjects((prevState) => {
        return prevState.map((project) => {
          return project.id !== curr_project[0].id ? project : { ...project, tasks: updated_tasks };
        });
      });
    } else {
      values.id = curr_task_id;
      setProjects((prevState) => {
        return prevState.map((project) => {
          return project.id !== curr_project[0].id
            ? project
            : { ...project, tasks: [...project.tasks, values] };
        });
      });
    }
  };

  const TaskList = curr_project[0].tasks.map((taskData, index) => {
    const { id, task, assigned, status } = taskData;
    return (
      <TaskRow
        id={id}
        task={task}
        status={status}
        assigned={assigned}
        key={index}
        openTaskItemModal={() => openTaskItemModal(taskData, id)}
        closeTaskItemModal={closeTaskItemModal}
      />
    );
  });

  return (
    <>
      <Header />
      <AdminNavbar />
      <div className='details--container justify-center'>
        <div className='profile--details'>
          <div className='flex-row'>
            <div className='projectTitle' style={{ marginRight: '15px' }}>
              {curr_project[0].title}
            </div>
            <div className='edit' onClick={() => openDetailsModal(curr_project)}>
              <EditOutlined className='edit' style={{ fontSize: '20px', color: '#000' }} />
            </div>
          </div>
          <div className='clientDetails'>
            <div className='clientName'>Client: {curr_project[0].client}</div>
            <div className='dueDate'>Due Date: {curr_project[0].dueDate}</div>
          </div>
        </div>
        <div className='task-container'>
          <div className='task'>
            <div></div>
            <div className='task-title heading'>Task List</div>
            <div className='assigned heading'>Who is assigned</div>
            {/* <button className="add-task" onClick={()=>openTaskItemModal(null, curr_project[0].tasks.length + 1)}>Add Task</button> */}
            <div></div>
          </div>
          {TaskList}
        </div>
        <div className='flex-row'>
          <AddTask openTaskItemModal={openTaskItemModal} id={curr_project[0].tasks.length + 1} />
        </div>
        <div className='status-info-container flex-row mb-50'>
          <div className='flex-row'>
            <div className='status-box mr-10 ' style={{ backgroundColor: '#f45c2e' }}></div>
            <div>Not Started Yet</div>
          </div>
          <div className='flex-row'>
            <div className='status-box mr-10 ' style={{ backgroundColor: '#f4c331' }}></div>{' '}
            <div>Active</div>
          </div>
          <div className='flex-row'>
            <div className='status-box mr-10 ' style={{ backgroundColor: '#30f558' }}></div>{' '}
            <div>Completed</div>
          </div>
        </div>
      </div>

      <DetailboardItemFormModal
        visible={isDetailsModalVisible}
        onCancel={closeDetailsModal}
        onOk={(values) => {
          setProjects((prevState) => {
            return prevState.map((project) => {
              return project.id !== Number(projectid) ? project : { ...project, ...values };
            });
          });
        }}
        initialValues={ProjectDetailsToEdit}
      />

      <TaskboardItemFormModal
        visible={isTaskModalVisible}
        onCancel={closeTaskItemModal}
        onOk={(values) => updateTaskList(values)}
        initialValues={taskToEdit}
      />
    </>
  );
};
