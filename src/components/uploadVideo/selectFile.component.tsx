import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import React from 'react';

// import trainingImg from '../../assets/training.jpeg';
// import { empVideoData } from '../../dummyData/empVideoData';

const { Option } = Select;

const UploadVideo = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true);
    // we can edit fetch part later when we implement API
    fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  const onFinish = (values) => {
    //   alert('Success');
    //   empVideoData.push({
    //     title: values.title,
    //     link: values.link,
    //     cover: trainingImg,
    //     type: values.type,
    //     description: values.description,
    //   });
  };
  const onFinishFailed = (errorInfo) => {
    alert('Failed');
  };

  return (
    <>
      <Form
        name='form'
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please fill up the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Type' name='type' rules={[{ required: true }]}>
          <Select placeholder='Select a type'>
            <Option value='employees'>Employees</Option>
            <Option value='developers'>Developers</Option>
            <Option value='designers'>Designers</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          rules={[{ required: true, message: 'Please fill up the description!' }]}
        >
          <TextArea rows={7} />
        </Form.Item>
        <Form.Item label='Video Link' name='link'>
          <Input />
        </Form.Item>
        <Form.Item label='Upload a file' name='file'>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
            <Button
              type='primary'
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{
                backgroundColor: 'black',
                color: 'white',
                marginTop: 16,
              }}
            >
              {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};
export default UploadVideo;
