import React from 'react';
import axios from 'axios';

// Icons
import deleteFileIcon from './Icons/Deletefile.svg';

const fileIconStyle = {
    width: '20px',
    height: '20px'
};

function DeleteFileButton( {name, folderPath, updateFolderTree}) {
    const handleClick = async() => {
        if (window.confirm(`Are you sure you want to delete the file "${name}"?`)) {
            const formData = new FormData();
        
            formData.append("fileName", name);
            formData.append("folderPath", folderPath);
    
            axios.delete("/deleteFile", { data: formData })
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
        <img 
                style={fileIconStyle} 
                src={deleteFileIcon} 
                alt="Delete a file button"
                onClick={handleClick}
                />
    )
}

export default DeleteFileButton;