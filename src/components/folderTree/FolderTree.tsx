import React from 'react';

// Components
import Folder from './Folder';
import File from './File';

const childStyle = {
    marginLeft: "20px"
}

function FolderTree( {style, tree, updateFolderTree} ) {
    return (
        <div style={style}>
            {tree.map((node) => {
                if (node.type === 'folder') {
                    return (
                        <Folder 
                            key={node.name} 
                            name={node.name}
                            // tree is empty, so TS complains 
                            // tree={node.children}
                            folderPath={node.folderPath}
                            updateFolderTree={updateFolderTree}
                        >
                            <FolderTree 
                                style={childStyle} 
                                tree={node.children} 
                                updateFolderTree={updateFolderTree}
                            />    
                        </Folder>
                    );
                }
                else {
                    return <File key={node.name} 
                                 name={node.name} 
                                 folderPath={node.folderPath}
                                 updateFolderTree={updateFolderTree}
                            />;
                }
            })}
        </div>
    );
}

export default FolderTree;