import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Components
import DeleteFileButton from './DeleteFileButton';
import DownloadButton from './DownloadButton';

// Icons
import { EditOutlined } from '@ant-design/icons';
import { FileOutlined } from '@ant-design/icons';

function File({ name, folderPath, updateFolderTree }) {
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
            formData.append("filePath", folderPath + "/" + name);
            formData.append("newName", newName);

            axios.put('http://localhost:8080/api/renameFile', formData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("userToken")}`
                }
            })
                .then(response => {
                    console.log("file " + name + " has been renamed to " + newName);
                })
                .catch(error => {
                    console.log(error);
                })

            updateFolderTree();
        } else if (event.key === 'Escape') {
            setEditingName(false);
        }
    }, [name, folderPath, updateFolderTree, newName]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleEditClick = () => {
        setEditingName(true);
    }

    return <div
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => { setIsHovered(false) }}
    >
        &nbsp;&nbsp;&nbsp;
        <FileOutlined />
        {editingName ? (
            <input type="text" value={newName} onChange={handleNameChange} onKeyDown={handleKeyDown} />
        ) : (
            <span>{name}</span>
        )}
        {isHovered &&
            <>
                <DeleteFileButton
                    name={name}
                    folderPath={folderPath}
                    updateFolderTree={updateFolderTree}
                />
                <EditOutlined onClick={handleEditClick} />
                <DownloadButton name={name} folderPath={folderPath} />
            </>
        }
    </div>;
}

File.propTypes = {
    name: PropTypes.string.isRequired,
    folderPath: PropTypes.string.isRequired,
    updateFolderTree: PropTypes.func.isRequired,
};


export default File;