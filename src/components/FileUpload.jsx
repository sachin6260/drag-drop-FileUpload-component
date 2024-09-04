import React, { useState } from 'react';
import './FileUpload.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  return (
    <div className="file-upload-outer-wrapper">
      <div className="file-upload-container-wrapper">
        <div
          className={`file-upload-container ${dragActive ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="file-upload-content">
            <div className="upload-icon">
              <i className="fas fa-folder-open"></i>
            </div>
            <p>Drag and drop your files here</p>
            <p>Or, <label htmlFor="fileUploadInput" className="browse-link">browse to upload</label></p>
            <input
              id="fileUploadInput"
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="drop-line"></div>
      </div>
      {files.length > 0 && (
        <div className="file-list-container">
          <h3>Uploaded Files:</h3>
          <ul className="file-list">
            {files.map((file, index) => (
              <li key={index} className="file-item">
                <p>{file.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
