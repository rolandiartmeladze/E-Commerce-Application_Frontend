import React, { useState } from 'react';
import axios from 'axios';

const UploadImage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select an image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('photo', selectedFile);
  
    try {
      const response = await fetch('https://lavish-husky-gaura.glitch.me/upload', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      const responseData = await response.json();
      setUploadStatus(responseData.message);
    } catch (error) {
      setUploadStatus('Error uploading image.');
    }
  };
  
  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default UploadImage;
