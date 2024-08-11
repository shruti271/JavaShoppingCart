import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadMessage(`File uploaded successfully: ${result.filename}`);
        if (onImageUpload) {
          onImageUpload(file);
        }
      } else {
        setUploadMessage('Failed to upload file.');
      }
    } catch (error) {
      setUploadMessage('Error uploading file.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default ImageUpload;
