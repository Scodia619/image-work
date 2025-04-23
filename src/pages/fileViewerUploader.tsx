import React from 'react';
import { useUserContext } from '../contexts/userContext';

const FileViewerUploader: React.FC = () => {

    const {user} = useUserContext();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">File Viewer & Uploader</h2>
        <p>Welcome to the file viewer and uploader page!</p>
        {user?.username}
      </div>
    </div>
  );
};

export default FileViewerUploader;