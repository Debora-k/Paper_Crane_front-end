import { MinusCircleOutlined } from '@ant-design/icons';
import { DataContext } from 'app';
import Header from 'components/Header/Header';
import SuperAdminNavbar from 'components/superAdminNavbar/SuperAdminNavbar';
import React, { useContext } from 'react';
import './manageAdmin.page.css';


function SuperAdmin() {
  // const [radioId, setRadioId] = useState<number | null>(null);
  const { admins, setAdmins } = useContext(DataContext);

  // const handleRadioClick = (id: number) => {
  //   setRadioId(id);
  //   console.log(radioId);
  // };

  // const handleDeleteButton = ) => {
  //   setAdmins((prevState) => {
  //     return prevState.filter((admin) => admin.userId !== radioId);
  //   });
  //   setRadioId(null);
  // };
  const handleDeleteButton = (id: number) => {
    setAdmins((prevState) => {
      return prevState.filter((admin) => admin.userId !== id);
    });
  };
  const allAdmins = admins.map((admin, index) => {
    return (
      <div className='admin-row align-center' key={index}>
        <div className='userId align-center'>{admin.userId}</div>
        <div className='name align-center'>{admin.name}</div>
        <div className='details align-center'>{admin.type}</div>
        {/* <input
          type={'radio'}
          name='editadmin'
          className=''
          onClick={() => handleRadioClick(admin.userId)}
        ></input> */}
        <div className='delete-btn' onClick={()=>handleDeleteButton(admin.userId)}><MinusCircleOutlined/></div>
      </div>
    );
  });
  return (
    <>
      <Header />
      <SuperAdminNavbar />
      <div className='admin-details-container'>
        <div className='admin-row'>
          <div className='userId heading align-center'>User Id</div>
          <div className='name heading align-center'>Name</div>
          <div className='details heading align-center'>Details</div>
          {/* <button className='delete-btn align-center' onClick={handleDeleteButton}>
            Delete
          </button> */}
        </div>
        <div className='admin-list'>{allAdmins}</div>
      </div>
    </>
  );
}

export default SuperAdmin;
