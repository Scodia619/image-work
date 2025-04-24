import React, { useState, ChangeEvent } from 'react';
import { useUserContext } from '../contexts/userContext';

const FileUpload: React.FC = () => {

  const {user} = useUserContext();
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }
  
    if (!user?.id) {
      setError('User is not logged in.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', user.id);
  
    try {
      setIsUploading(true);
      setError('');
  
      const response = await fetch('https://localhost:7066/Image', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Upload failed.');
      }
  
      const result = await response.text();
      setUploadUrl(result);
    } catch (err) {
      setError('Failed to upload file.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload a File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>

      {uploadUrl && (
        <div>
          <p>Uploaded File URL:</p>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">{uploadUrl}</a>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
