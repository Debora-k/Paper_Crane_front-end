import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Components
import FileInput from './FileInput';
import AddFolderButton from './AddFolderButton';
import DeleteFolderButton from './DeleteFolderButton';
import DragDropBox from 'components/dragDrop/dragDropBox.component';

// Icons
import { FolderOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { RightOutlined } from '@ant-design/icons';

interface FolderProps {
    name: string,
    children: React.ReactNode,
    folderPath: string,
    updateFolderTree: () => void,
}

function Folder( {name, children, folderPath, updateFolderTree}: FolderProps ) {
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

            axios.put("http://localhost:8080/renameFolder", formData)
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
                <span onClick={() => setIsOpen(!isOpen)}>{isOpen ? <DownOutlined /> : <RightOutlined />}</span>
                <FolderOutlined />
                {editingName ? (
                    <input type="text" value={newName} onChange={handleNameChange} onKeyDown={handleKeyDown} />
                ) : (
                    <span>{" " + name + " "}</span>
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
                    <EditOutlined onClick={handleEditClick} />
                </span>  
                }
            </div>
            {isOpen && (
                <>
                    <DragDropBox 
                        folderPath={folderPath}
                        updateFolderTree={updateFolderTree}
                    />
                    {children}
                </>
            )}
        </div>
    );
}

Folder.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    folderPath: PropTypes.string.isRequired,
    updateFolderTree: PropTypes.func.isRequired,
};

export default Folder;