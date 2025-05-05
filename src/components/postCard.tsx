import React from 'react';
import { Post } from '../Models';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
      <h3>Post by {post.username}</h3>
      <p>{post.text}</p>
      <p><small>{new Date(post.createdAt).toLocaleString()}</small></p>
      {post.images && post.images.length > 0 && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {post.images.map(image => (
            <img
              key={image.imageId}
              src={image.fileUrl}
              alt={image.fileName}
              style={{ maxWidth: '150px', borderRadius: '4px' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
