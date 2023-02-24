import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Components
import FileInput from './FileInput';
import AddFolderButton from './AddFolderButton';
import DeleteFolderButton from './DeleteFolderButton';

// Icons
import FolderIcon from './Icons/folder.svg';
import EditIcon from './Icons/Edit.svg';

const IconStyle = {
    width: '25px',
    height: '25px'
};

function Folder( {name, children, folderPath, updateFolderTree} ) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            setEditingName(false);
            
            const formData = new FormData();
            formData.append("folderPath", folderPath)
            formData.append("newName", newName);

            axios.put("/renameFolder", formData)
                 .then(response => {
                    console.log(response.data);
                 })
                 .catch(error => {
                    console.log(error);
                 })
            
            updateFolderTree();

        } else if (event.key === 'Escape') {
            setEditingName(false);
        }
    }, [folderPath, newName, updateFolderTree]);

    useEffect( () => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleEditClick = () => {
        setEditingName(true);
    }

    return (
        <div>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span onClick={() => setIsOpen(!isOpen)}>{isOpen ? ' -' : ' +'}</span>
                <img style={IconStyle} src={FolderIcon} alt="Folder Icon" />
                {editingName ? (
                    <input type="text" value={newName} onChange={handleNameChange} onKeyDown={handleKeyDown} />
                ) : (
                    <span>{name}</span>
                )}
                { isHovered && 
                <span>
                    <FileInput 
                        folderPath={folderPath} 
                        updateFolderTree={updateFolderTree}
                        />
                    <AddFolderButton 
                        folderPath={folderPath}
                        updateFolderTree={updateFolderTree}
                        />
                    <DeleteFolderButton
                        name={name}
                        folderPath={folderPath}
                        updateFolderTree={updateFolderTree}
                        />
                    <img style={IconStyle} src={EditIcon} alt="Edit Icon" onClick={handleEditClick} />
                </span>  
                }
            </div>
            {isOpen && children}
        </div>
    );
};

export default Folder;