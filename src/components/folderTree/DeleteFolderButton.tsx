import React from 'react';
import axios from 'axios';

// Icons
import DeleteFolderIcon from './Icons/Deletefolder.svg';

const deleteFolder = {
    width: '25px',
    height: '25px'
};

const DeleteFolderButton = ( {name, folderPath, updateFolderTree}) =>
{
    const handleClick = () => {
        if(window.confirm(`Are you sure you want to delete the "${name}" folder and ALL of it's contents?`)) {
            const formData = new FormData();

            formData.append("folderPath", folderPath);
    
            axios.delete("/deleteFolder", { data: formData })
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
        <img style={deleteFolder} src={DeleteFolderIcon} alt="Delete Folder Button" onClick={handleClick}/>
    )
};

export default DeleteFolderButton;