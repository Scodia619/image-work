import { Post } from '../Models';
import PostCard from './postCard';

interface PostListViewerProps {
  posts: Post[];
}

const PostListViewer: React.FC<PostListViewerProps> = ({ posts }) => {

    return (
        <div>
    <h2>All Posts</h2>
    {posts.length === 0 ? (
      <p>No posts found.</p>
    ) : (
      posts.map(post => (
        <PostCard key={post.postId} post={post} />
      ))
    )}
  </div>
    )
}

export default PostListViewer