import React from 'react';
import axios from 'axios';

// Icons
import AddFolderIcon from './Icons/Addfolder.svg';

const addFolder = {
    width: '25px',
    height: '25px'
};

const AddFolderButton = ( {folderPath, updateFolderTree}) =>
{
    const handleClick = () => {
        const formData = new FormData();
        formData.append("folderPath", folderPath);

        axios.post("/createFolder", formData)
             .then(response => {
                console.log(response.data);
                updateFolderTree();
             })
             .catch(error => {
                console.log(error);
             })
    }

    return (
        <img style={addFolder} src={AddFolderIcon} alt="Add Folder Button" onClick={handleClick}/>
    )
};

export default AddFolderButton;