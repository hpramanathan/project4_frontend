import './UserSignup.css';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserSignup({ setCurrUser, setShow }) {
  const formRef = useRef();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const signup = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3000/api/v1/signup";
    try {
      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });
      const data = await response.json();
      if (!response.ok) throw data.error;
      localStorage.setItem('token', response.headers.get('Authorization'));
      setCurrUser(data);
      setSuccessMessage('Signup successful!');
      setTimeout(() => {
        navigate('/api/v1/login');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password
      }
    };
    signup(userInfo, setCurrUser);
    e.target.reset();
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <form className="signup-form" ref={formRef} onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="name" placeholder="Type here..." required />
        </label>
        <label>
          Email:
          <input type="email" name="email" placeholder="Please enter a valid email address" required />
        </label>
        <label>
          Username:
          <input type="text" name="username" placeholder="How you'd like to be known by other users" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" placeholder="Good news, it'll be encrypted" required />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <br />
      <div>
        Already registered, <Link to="/api/v1/login">Log In</Link>.
      </div>
      {successMessage && (
        <div className="success-popup">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
}

export default UserSignup;
