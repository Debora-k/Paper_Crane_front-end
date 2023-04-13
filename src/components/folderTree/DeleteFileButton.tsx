import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Icons
import { DeleteTwoTone } from '@ant-design/icons';
import { red } from '@ant-design/colors';


function DeleteFileButton({ name, folderPath, updateFolderTree }) {
    const handleClick = async () => {
        if (window.confirm(`Are you sure you want to delete the file "${name}"?`)) {
            const formData = new FormData();

            formData.append("fileName", name);
            formData.append("folderPath", folderPath);

            axios.delete("http://localhost:8080/api/deleteFile", {
                data: formData,
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
    }

    return (
        <DeleteTwoTone onClick={handleClick} twoToneColor={red.primary} />
    )
}

DeleteFileButton.propTypes = {
    name: PropTypes.string.isRequired,
    folderPath: PropTypes.string.isRequired,
    updateFolderTree: PropTypes.func.isRequired
};

export default DeleteFileButton;