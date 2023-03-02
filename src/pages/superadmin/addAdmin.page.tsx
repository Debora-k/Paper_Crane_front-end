import { AdminContext } from 'app';
import React, { useContext, useState } from 'react';
import SuperAdminNavbar from 'components/superAdminNavbar/SuperAdminNavbar';
import './addAdmin.page.css';
import Header from 'components/Header/Header';

function AddAdmin() {
  const [alert, setAlert] = useState(false);
  const {admins, setAdmins}  = useContext(AdminContext);
  const [newAdmin, setNewAdmin] = useState({
    userId: admins.length + 1,
    name: '',
    username: '',
    domain: '',
    type: 'default',
  });

  const handleSubmit = (e) => {
  e.preventDefault();
    setAdmins((prevState) => {
      return [...prevState, { ...newAdmin, email: `${newAdmin.username}@${newAdmin.domain}` }];
    });
    setNewAdmin({ userId: admins.length + 1, name: '', username: '', domain: '', type: 'default' });
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAdmin((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <>
    <Header/>
      <SuperAdminNavbar />
      <div className='superAdmin--container'>
        <div className='add-admin-form'>
          {alert && <p>New admin added!</p>}
          <div className='input-row'>
            <label htmlFor='userId' className='labels'>
              User Id:
            </label>
            <input
              type={'text'}
              value={'{Valid Default Value}'}
              id='userId'
              name='userId'
              disabled
            />
          </div>

          <div className='input-row'>
            <label htmlFor='userId' className='labels'>
              Type:
            </label>
            <input type={'text'} value={'{Valid Default Value}'} id='type' name='type' disabled />
          </div>

          <div className='input-row'>
            <label htmlFor='name' className='labels'>
              Name:
            </label>
            <input
              type={'text'}
              value={newAdmin.name}
              id='name'
              name='name'
              onChange={handleChange}
              required
              disabled={alert}
            />
          </div>
          <div className='input-row'>
            <label htmlFor='username' className='labels'>
              Email:
            </label>
            <div>
              <input
                type={'text'}
                value={newAdmin.username}
                id='username'
                name='username'
                onChange={handleChange}
                required
                disabled={alert}
              />
              @
              <input
                type={'text'}
                value={newAdmin.domain}
                id='domain'
                name='domain'
                onChange={handleChange}
                disabled={alert}
              />
            </div>
          </div>
          <div className='input-row'>
            <div></div>
            <button type={'submit'} onClick={handleSubmit} className='add-btn'>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAdmin;
