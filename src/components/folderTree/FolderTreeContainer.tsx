import React, { useState, useEffect } from 'react';
import axios from 'axios';

// CSS
import './FolderTreeContainer.css';

// Components
import FolderTree from './FolderTree';

function FolderTreeContainer() {

    const [tree, setTree] = useState([]);
  
    const updateFolderTree = () => {
      axios.get('/getFolderStructure')
           .then(response => {
              setTree(response.data);
           })
           .catch(error => {
              console.log(error);
            })
    };
  
    // Initialize the folder structure
    useEffect( () => {
      updateFolderTree();
  }, []);
  
    return (
      <div className="FolderTreeContainer">
        <FolderTree 
        // style wasn't here at first, due to TS complained, created null style
        style={null}
          tree={tree}
          updateFolderTree={updateFolderTree}
        />
      </div>
    );
  }

  export default FolderTreeContainer;