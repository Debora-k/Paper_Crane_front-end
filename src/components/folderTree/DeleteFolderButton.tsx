import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Icons
import { DeleteTwoTone } from '@ant-design/icons';
import { red } from '@ant-design/colors';

const DeleteFolderButton = ( {name, folderPath, updateFolderTree}) =>
{
    const handleClick = () => {
        if(window.confirm(`Are you sure you want to delete the "${name}" folder and ALL of it's contents?`)) {
            const formData = new FormData();

            formData.append("folderPath", folderPath);
    
            axios.delete("http://localhost:8080/deleteFolder", { data: formData })
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
};

DeleteFolderButton.propTypes = {
    name: PropTypes.string.isRequired,
    folderPath: PropTypes.string.isRequired,
    updateFolderTree: PropTypes.func.isRequired,
  };

export default DeleteFolderButton;