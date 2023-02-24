import CreateClientAccount from 'components/createAccount/admin.clients.createAccount';
import React from 'react';
import { Link } from 'react-router-dom';

import './admin.clients.page.css';
import AdminNavbar from './admin.navbar';

/**
 * In the futuer, we will work on the part of leading other pages by clicking on links(buttons of view and edit)
 *
 */
const AdminClients = () => {
  const clients = [
    // empId will be given automatically from back-end
    { cId: 1, name: 'Debora', company: 'Paper Crane', email: '1234@gmail.com' },
    { cId: 2, name: 'Parshant', company: 'Paper Crane', email: '1234@gmail.com' },
    { cId: 3, name: 'Marcus', company: 'Paper Crane', email: '1234@gmail.com' },
    { cId: 4, name: 'Hashem', company: 'Paper Crane', email: '1234@gmail.com' },
    { cId: 5, name: 'Ben', company: 'Paper Crane', email: '1234@gmail.com' },
    { cId: 6, name: 'Reece', company: 'Paper Crane', email: '1234@gmail.com' },
  ];
  // column headers for employees list
  const columHeaders = [
    <div key='headers' className='clientRows'>
      <p className='buttonColumn'>ID</p>
      <p className='columnHeader'>Name</p>
      <p className='columnHeader'>Company</p>
      <p className='columnHeader'>Email</p>
      {/* this empty p is for 'View' buttons' column header */}
      <p className='buttonColumn'></p>
      {/* this empty p is for 'Edit' buttons' column header */}
      <p className='buttonColumn'></p>
    </div>,
  ];

  // empRows will contain the employee arrays below
  const clientRows = [];
  // add employee rows to the empRows
  for (let i = 0; i < clients.length; i++) {
    clientRows.push(
      <div className='clientRows'>
        <p className='buttonColumn'>{clients[i].cId}</p>

        <p className='column'>{clients[i].name}</p>

        <p className='column'>{clients[i].company} </p>

        <p className='column'>{clients[i].email}</p>
        {/* edit and view buttons */}
        <p className='buttonColumn'>
          <Link to={`/admin/clients/${clients[i].cId}/view`}>
            <button type='button'>View</button>
          </Link>
        </p>
        <p className='buttonColumn'>
          <Link to={`/admin/clients/${clients[i].cId}/edit`}>
            <button type='button'>Edit</button>
          </Link>
        </p>
      </div>,
    );
  }

  return (
    <div>
      <AdminNavbar />
      <div className='container'>
        <ul>
          {columHeaders} {clientRows}
        </ul>
        <CreateClientAccount />
      </div>
    </div>
  );
};

export default AdminClients;
