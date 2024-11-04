import React from 'react';
import axios from 'axios';

const DownloadFile = ({ filename }) => {
    const downloadFile = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/file/${filename}`, {
                responseType: 'blob' // Important to get the file as a blob
            });

            // Create a URL for the file and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Name the file when downloading
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <div>
            <button onClick={downloadFile}>Download {filename}</button>
        </div>
    );
};

export default DownloadFile;
