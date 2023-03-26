import AdminHeader from 'components/Header/adminHeader';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateClientAccount from 'views/admin/createAccount/admin.clients.createAccount';
import EditClientAccount from 'views/admin/editAccount/admin.client.editAccount';

import './admin.clients.page.css';
import AdminNavbar from './admin.navbar';

/**
 * In the futuer, we will work on the part of leading other pages by clicking on links(buttons of view and edit)
 *
 */
const AdminClients = () => {
  const [clients, setClients] = useState([
    // empId will be given automatically from back-end
    { cId: 1, name: 'Debora', company: 'Paper Crane', email: '1234@gmail.com' },
    { cId: 2, name: 'Parshant', company: 'Paper Crane', email: '1234@gmail.com' },
    { cId: 3, name: 'Marcus', company: 'Paper Crane', email: '1234@gmail.com' },
    { cId: 4, name: 'Hashem', company: 'Paper Crane', email: '1234@gmail.com' },
    { cId: 5, name: 'Ben', company: 'Paper Crane', email: '1234@gmail.com' },
    { cId: 6, name: 'Reece', company: 'Paper Crane', email: '1234@gmail.com' },
  ]);

  const [selectedClient, setSelectedClient] = useState<{
    cId: number;
    name: string;
    company: string;
    email: string;
  }>();

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
          <button type='button' onClick={() => setSelectedClient(clients[i])}>
            Edit
          </button>
        </p>
        <p className='buttonColumn'>
          <button
            type='button'
            onClick={() =>
              setClients((prevState) => prevState.filter((client) => client.cId !== clients[i].cId))
            }
          >
            Delete
          </button>
        </p>
      </div>,
    );
  }

  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <div className='container'>
        <ul>
          {columHeaders} {clientRows}
        </ul>
        {selectedClient ? (
          <EditClientAccount
            firstName={selectedClient.name}
            companyName={selectedClient.company}
            email={selectedClient.email}
            onCancel={() => setSelectedClient(undefined)}
          />
        ) : (
          <CreateClientAccount />
        )}
      </div>
    </div>
  );
};

export default AdminClients;
