import { AdminContext } from 'app';
import Header from 'components/Header/Header';
import SuperAdminNavbar from 'components/superAdminNavbar/SuperAdminNavbar';
import React, { useContext, useState } from 'react';
import './manageAdmin.page.css';
function SuperAdmin() {
  const [radioId, setRadioId] = useState<number | null>(null);
  const {admins, setAdmins}  = useContext(AdminContext);

  const handleRadioClick = (id: number) => {
    setRadioId(id);
    console.log(radioId);
  };

  const handleDeleteButton = () => {
    setAdmins((prevState) => {
      return prevState.filter((admin) => admin.userId !== radioId);
    });
    setRadioId(null);
  };
  const allAdmins = admins.map((admin, index) => {
    return (
      <div className='admin-row align-center' key={index}>
        <div className='userId align-center'>{admin.userId}</div>
        <div className='name align-center'>{admin.name}</div>
        <a href='/'>
          <div className='details align-center'>details</div>
        </a>
        <input
          type={'radio'}
          name='editadmin'
          className=''
          onClick={() => handleRadioClick(admin.userId)}
        ></input>
      </div>
    );
  });
  return (
    <>
    <Header/>
      <SuperAdminNavbar />
        <div className='admin-details-container'>
          <div className='admin-row'>
            <div className='userId heading align-center'>User Id</div>
            <div className='name heading align-center'>Name</div>
            <div className='details heading align-center'>Details</div>
            <button className='delete-btn align-center' onClick = { handleDeleteButton } >
              Delete
            </button>
          </div>
          <div className='admin-list'>{allAdmins}</div>
      </div>
    </>
  );
}

export default SuperAdmin;

