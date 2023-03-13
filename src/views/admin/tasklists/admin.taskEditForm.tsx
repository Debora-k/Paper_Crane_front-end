import { Button, Form, Input, Modal, ModalProps, Radio, Select} from 'antd';
import React, { useEffect, useRef } from 'react';
import { Status } from './adminDataTypes';

import { TaskRowItem } from './adminModatTypes';

export type TaskItemFormValues = Pick<TaskRowItem, 'status' | 'assigned' | 'task' | 'id'>;

type TaskboardItemFormModalProps = Pick<ModalProps, 'visible'> & {
  initialValues: TaskItemFormValues;
  onCancel: any;
  onOk: (values: TaskItemFormValues) => void;
};

function TaskboardItemFormModal({
  visible,
  initialValues,
  onCancel,
  onOk,
}: TaskboardItemFormModalProps) {
  const [form] = Form.useForm<TaskItemFormValues>();

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
      title='Edit Task'
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
          label='Status'
          name='status'
          rules={[{ required: true, message: "'Status' field is required" }]}
        >
          <Radio.Group>
            <Radio value={Status.TO_DO}> To Do </Radio>
            <Radio value={Status.IN_PROGRESS}> In Progress </Radio>
            <Radio value={Status.DONE}> Done </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='task'
          label='Title'
          rules={[
            { required: true, message: "'Title' field is required" },
            {
              max: 30,
              message: "'Title' can not be longer than 100 characters",
            },
          ]}
        >
          <Input ref={inputRef} autoFocus />
        </Form.Item>
        <Form.Item
          label='Assign to:'
          name='assigned'
          rules={[{ required: true, message: "'Assign to' field is required" }]}
        >
          <Select>
            <Select.Option value="Parshant">Parshant</Select.Option>
            <Select.Option value="Debora">Debora</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TaskboardItemFormModal;
