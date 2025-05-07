import React, { useState } from 'react';
import { Post } from '../Models';
import '../styles/PostCard.css';
import { useUserContext } from '../contexts/userContext';
import axios from 'axios';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {

  const { user } = useUserContext();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [optimisticComments, setOptimisticComments] = useState(post.comments || []);

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        commentId: Date.now().toString(),
        username: user?.username || 'Unknown User',
        body: commentText,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
        userId: user.id,
        postId: post.postId,
      };

      // Optimistically add the new comment to the list
      setOptimisticComments([newComment, ...optimisticComments]);
      setCommentText('');

      const commentData = {
        userId: user?.id,
        postId: post.postId,
        body: commentText,
      };

      try {
        await axios.post('https://localhost:7066/Comment', commentData);
      } catch (error) {
        setOptimisticComments(prevComments => prevComments.filter(comment => comment.commentId !== newComment.commentId));
        console.error("Error posting comment:", error);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setOptimisticComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));

    try {
      await axios.delete(`https://localhost:7066/Comment/${commentId}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="post-card">
      <h3 className="post-card__username">Post by {post.username}</h3>
      <p className="post-card__text">{post.text}</p>

      <div className="post-card__content">
        {post.images && post.images.length > 0 && (
          <div className="post-card__images">
            {post.images.map(image => (
              <img
                key={image.imageId}
                src={image.fileUrl}
                alt={image.fileName}
                className="post-card__image"
              />
            ))}
          </div>
        )}

        <div className="post-card__bottom">
          <p className="post-card__timestamp">
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </p>

          <form onSubmit={handleCommentSubmit} className="post-card__comment-form">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="post-card__comment-input"
              placeholder="Add a comment..."
            />
            <button type="submit" className="post-card__comment-submit">Post</button>
          </form>

          <button onClick={toggleComments} className="post-card__comments-toggle">
            {showComments
              ? 'View less'
              : post.comments?.length > 0
              ? `View ${post.comments.length} comment${post.comments.length > 1 ? 's' : ''}`
              : 'No comments yet'}
          </button>
        </div>

        {showComments && optimisticComments && optimisticComments.length > 0 && (
          <div className="post-card__comments">
            {optimisticComments.map(comment => (
              <div key={comment.commentId} className="post-card__comment">
                <p className="post-card__comment-username"><strong>{comment.username}</strong></p>
                <p className="post-card__comment-body">{comment.body}</p>
                <p className="post-card__comment-timestamp"><small>{new Date(comment.createdAt).toLocaleString()}</small></p>

                {comment.userId === user?.id && (
                  <button
                    className="post-card__comment-delete"
                    onClick={() => handleDeleteComment(comment.commentId)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
