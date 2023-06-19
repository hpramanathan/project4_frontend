import React, { useEffect, useState } from 'react';

export default function ShowUserPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users/:id/posts');
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    <div id="ShowUserPosts">
      <h1>User Posts</h1>
      <table className="user-posts-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
