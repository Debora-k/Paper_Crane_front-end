import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Icons
import { FolderAddOutlined } from '@ant-design/icons';

const AddFolderButton = ({ folderPath, updateFolderTree }) => {
    const handleClick = () => {
        const formData = new FormData();
        formData.append("folderPath", folderPath);

        axios.post("http://localhost:8080/api/createFolder", formData, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("userToken")}`
            }
        })
            .then(response => {
                console.log(response.data);
                updateFolderTree();
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <FolderAddOutlined onClick={handleClick} />
    )
};

AddFolderButton.propTypes = {
    folderPath: PropTypes.string.isRequired,
    updateFolderTree: PropTypes.func.isRequired
};

export default AddFolderButton;