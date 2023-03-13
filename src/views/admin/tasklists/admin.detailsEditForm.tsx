import { Button,  Form, Input, Modal, ModalProps } from 'antd';
import React, { useEffect, useRef } from 'react';

// import { Status } from './adminDataTypes';
import { ProjectDetail } from './adminModatTypes';

export type DetailsFormValues = Pick<
  ProjectDetail,
  'id' | 'title' | 'description' | 'status' | 'client' | 'repository' | 'dueDate'
>;

type DetailboardItemFormModalProps = Pick<ModalProps, 'visible'> & {
  initialValues: DetailsFormValues;
  onCancel: any;
  onOk: (values: DetailsFormValues) => void;
};

function DetailboardItemFormModal({
  visible,
  initialValues,
  onCancel,
  onOk,
}: DetailboardItemFormModalProps) {
  const [form] = Form.useForm<DetailsFormValues>();

  //@ts-ignore
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (visible) {
      // Focus on the first input when the modal is opened
      inputRef.current?.focus();
      form.resetFields();
    }
  }, [form, visible]);

  return (
    <Modal
      title='Edit Details'
      open={visible}
      destroyOnClose
      // To make dynamically changing initialValues work with Form
      forceRender
      onCancel={onCancel}
      onOk={() => form.submit()}
      footer={[
        <Button key='cancel' onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='ok'
          type='primary'
          onClick={() => form.submit()}
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          Ok
        </Button>,
      ]}
    >
      <Form
        autoComplete='off'
        form={form}
        layout='vertical'
        initialValues={initialValues}
        onFinish={(values) => {
          onOk(values);
          form.resetFields();
          onCancel();
        }}
      >
        <Form.Item
          label='Project Title'
          name='title'
          rules={[
            { required: true, message: "'Project Title' field is required" },
            {
              max: 50,
              message: "'Title' can not be longer than 50 characters",
            },
          ]}
        >
          <Input placeholder='project title' ref={inputRef} autoFocus />
        </Form.Item>
        <Form.Item
          label='Client Name'
          name='client'
          rules={[
            { required: true, message: "'Client Name' field is required" },
            {
              max: 50,
              message: "'Client Name' can not be longer than 50 characters",
            },
          ]}
        >
          <Input placeholder='client name' />
        </Form.Item>

        <Form.Item
          label='Due Date:'
          name='dueDate'
          rules={[{ required: true, message: "'Due Date' field is required" }]}
        >
          {/* <DatePicker placeholder='select date' /> */}
          <Input/>
        </Form.Item>
        <Form.Item
          label='Repository URL'
          name='repository'
          rules={[
            { required: true, message: "'Repository URL' field is required" },
            { type: 'url', warningOnly: true },
            { type: 'string', min: 6 },
          ]}
        >
          <Input placeholder='repository url' />
        </Form.Item>

        <Form.Item
          label='Description'
          name='description'
          rules={[
            {
              max: 200,
              message: "Description can not be longer than 200 characters",
            },
          ]}
        >
          <Input.TextArea placeholder='description' />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DetailboardItemFormModal;
