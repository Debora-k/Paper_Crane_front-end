import { Button, DatePicker, Modal, Select } from 'antd';
import React from 'react';

const SCOPE_OPTIONS = [
  { label: 'a10', value: 'a10' },
  { label: 'c12', value: 'c12' },
  { label: 'c23', value: 'c23' },
  { label: 'c34', value: 'c34' },
  { label: 'c45', value: 'c45' },
  { label: 'c56', value: 'c56' },
  { label: 'c67', value: 'c67' },
  { label: 'c78', value: 'c78' },
];

const SendRequestModal = ({ isModalOpen, handleOk, handleCancel }: any) => {
  return (
    <Modal
      title='Send Request'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Return
        </Button>,
        <Button key='submit' type='primary' onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <div style={{ margin: '20px 0' }}>
        <label htmlFor='scope' style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Scopes:
        </label>
        <Select
          mode='tags'
          style={{ width: '100%' }}
          placeholder='Please select scopes'
          options={SCOPE_OPTIONS}
          // manual input
        />
      </div>
      <div style={{ margin: '20px 0' }}>
        <label htmlFor='scope' style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Contract End Date:
        </label>
        <DatePicker style={{ width: '100%' }} />
      </div>
    </Modal>
  );
};

export default SendRequestModal;
