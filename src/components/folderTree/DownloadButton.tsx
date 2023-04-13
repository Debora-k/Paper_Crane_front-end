import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Icons
import { DownloadOutlined } from '@ant-design/icons';

const DownloadButton = ({ name, folderPath }) => {

    const handleClick = () => {
        const formData = new FormData();
        formData.append("fileName", name);
        formData.append("folderPath", folderPath);

        axios.post("http://localhost:8080/download", formData, {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("userToken")}`
            }
        },)
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
        <DownloadOutlined onClick={handleClick} />
    );
}

DownloadButton.propTypes = {
    name: PropTypes.string.isRequired,
    folderPath: PropTypes.string.isRequired
};

export default DownloadButton;