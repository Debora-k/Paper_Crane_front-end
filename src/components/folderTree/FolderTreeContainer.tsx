import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// CSS
import './FolderTreeContainer.css';

// Components
import FolderTree from './FolderTree';

function FolderTreeContainer({ repoName }) {

    const [tree, setTree] = useState([]);
  
    const updateFolderTree = () => {
      axios.get('http://localhost:8080/getFolderStructure/'+ repoName)
           .then(response => {
              setTree(response.data);
           })
           .catch(error => {
              console.log(error);
            })
    };
  
    // Update folder tree on load and when project is changed
    useEffect( () => {
      updateFolderTree();
  }, [repoName]);
  
    return (
      <div className="FolderTreeContainer">
        <FolderTree 
          style={null}
          tree={tree}
          updateFolderTree={updateFolderTree}
        />
      </div>
    );
  }

  FolderTreeContainer.propTypes = {
    style: PropTypes.object,
    tree: PropTypes.array,
    updateFolderTree: PropTypes.func,
    repoName: PropTypes.string
  };

export default FolderTreeContainer;