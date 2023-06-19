import './Posts.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Posts(props) {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);

  const handleAccountUpdate = (post) => {
    navigate(`/posts/${post.id}/update`, { state: { post } });
    console.log(`Editing post with ID: ${post.id}`);
  };

  const handleDelete = (post) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const url = `http://localhost:3000/api/v1/posts/${post.id}`;

      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Deleted post: ${post.email}`);
            window.location.reload();
          } else {
            throw new Error('Failed to delete post');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  let allPosts = props.posts.length > 0 ? (
    props.posts.map((post) => (
      <tr key={post.id}>
        <td>{post.user_id}</td>
        <td>{post.comment}</td>
        <td>
          <button onClick={() => handleAccountUpdate(post)}>Edit</button>
        </td>
        <td>
          <button onClick={() => handleDelete(post)}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4">No posts yet</td>
    </tr>
  );

  return (
    <div id="Posts">
      <h1>All Posts</h1>
        <Link to="/api/v1/posts/new">Add Post</Link>
        <br />
        <br />
      <table className="posts-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>{allPosts}</tbody>
      </table>
      <br />
    </div>
  );
}

export default Posts;
