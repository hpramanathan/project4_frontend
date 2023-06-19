import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreatePostForm() {
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // I need validation!

    // Create the post object
    const newPost = {
      comment
    };

    // Send a POST request to the API to create the post
    fetch('http://localhost:3000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary authentication headers
      },
      body: JSON.stringify(newPost)
    })
      .then((response) => {
        if (response.ok) {
          // Post created successfully
          // Navigate to the posts page or perform any other necessary action
          navigate('/api/v1/posts');
        } else {
          // Handle error response
          throw new Error('Failed to create post');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <label>Comment:</label>
        <input
          type="text"
          name="comment"
          placeholder="Enter comment here"
          value={comment}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Create Post" />
      </form>
      <br />
      <div>
        <Link to="/api/v1/posts">Back to Posts</Link>
      </div>
    </div>
  );
}

export default CreatePostForm;