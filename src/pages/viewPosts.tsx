import React, { useEffect, useState } from 'react';
import PostListViewer from '../components/postListViewer';
import PostUploadModal from '../components/PostUploadModal';
import { useUserContext } from '../contexts/userContext';
import { Post } from '../Models';
import axios from 'axios';

const ViewPosts: React.FC = () => {
  const { user } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          `https://localhost:7066/Post`
        );
        setPosts(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePostSubmit = async (text: string, file: File | null) => {
    try {
      const formData = new FormData();
      formData.append('userId', user?.id as string);
      formData.append('text', text);                  
      if (file) {
        formData.append('file', file);  
      }

      const response = await axios.post('https://localhost:7066/Post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 201) {
        throw new Error('Failed to create post');
      }

      const createdPost = response.data;
      setPosts([createdPost, ...posts]);  

    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>View Posts</h1>

      <button onClick={handleOpenModal} style={{ marginBottom: '2rem' }}>
        Create Post
      </button>

      <PostListViewer posts={posts} />

      <PostUploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handlePostSubmit} 
      />
    </div>
  );
};

export default ViewPosts;
