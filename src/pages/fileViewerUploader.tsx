import React, { useState } from 'react';
import FileUpload from '../components/fileUpload';
import FileViewer from '../components/fileViewer';

const FileViewerUploader: React.FC = () => {

  const [showUpload, setShowUpload] = useState(true);

  const toggleView = () => {
    setShowUpload((prev) => !prev);
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleView}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showUpload ? "View Uploaded Files" : "Upload New File"}
      </button>

      {showUpload ? <FileUpload /> : <FileViewer />}
    </div>
  );
};

export default FileViewerUploader;