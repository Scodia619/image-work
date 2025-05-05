import React, { useState } from 'react';
import '../styles/PostUploadModal.css';  // Import the CSS file

interface PostUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string, file: File | null) => void;
}

const PostUploadModal: React.FC<PostUploadModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]); 
    }
  };

  const handleSubmit = () => {
    if (text.trim() === "") {
      alert("Please provide some text for the post.");
      return;
    }

    onSubmit(text, file);  
    setText("");
    setFile(null); 
    onClose();            
  };

  if (!isOpen) return null; 

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Create a New Post</h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          className="textarea"
        ></textarea>

        <div className="file-input-container">
          <input type="file" onChange={handleFileChange} className="file-input" />
        </div>

        <div className="button-container">
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostUploadModal;
