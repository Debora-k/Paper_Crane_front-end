import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { message } from 'antd';

// Icons
import { FileAddOutlined } from '@ant-design/icons';

const FileInput = ({ folderPath, updateFolderTree }) => {
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderPath", folderPath)

    try {
      const response = await axios.post('http://localhost:8080/api/uploadFile', formData, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("userToken")}`
        }
      });
      console.log(response.data);
      updateFolderTree(response.data);
    } catch (error) {
      console.log(error);

      if (error.response.status === 409) {
        let overwrite = window.confirm("A file with the same name already exists. Do you want to continue?");
        if (overwrite) {
          formData.append("overwrite", "true");
          try {
            const response = await axios.post('http://localhost:8080/api/uploadFile', formData);
            console.log(response.data);
            updateFolderTree(response.data);
          } catch (error) {
            console.log("inside the overwrite");
            console.log(error);
          }
        }
      }
    }
  }

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files[0];
      try {
        await handleUpload(file);
      } catch (error) {
        message.error(`${file.name} file upload failed.`);
        console.log(error);
      }
    };
    input.click();
  };

  return (
    <span onClick={handleClick}>
      <FileAddOutlined />
    </span>
  );
};

FileInput.propTypes = {
  folderPath: PropTypes.string.isRequired,
  updateFolderTree: PropTypes.func.isRequired,
};

export default FileInput;
