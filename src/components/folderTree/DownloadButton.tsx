import React from 'react';
import axios from 'axios';

// Icons
import DownloadIcon from './Icons/Download.svg';

const IconStyle = {
    width: '20px',
    height: '20px'
};

const DownloadButton = ( {name, folderPath} ) => {

    const handleClick = () => {
        const formData = new FormData();
        formData.append("fileName", name);
        formData.append("folderPath", folderPath);
        
        axios.post("/download", formData, {
            responseType: 'blob'
        })
             .then(response => {
                // Trigger the download dialog box
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');

                link.href = url;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
             })
             .catch(error => {
                console.log(error);
             })
    }

    return (
        <img style={IconStyle} src={DownloadIcon} alt="Download file button" onClick={handleClick}/>
    );
}

export default DownloadButton;