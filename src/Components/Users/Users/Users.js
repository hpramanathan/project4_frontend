import "./Users.css";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Users(props) {
  const navigate = useNavigate();

  const handleAccountUpdate = (user) => {
    navigate(`/users/${user.id}/update`, { state: { user } });
  };

  const handleDelete = (user) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const url = `http://localhost:3000/api/v1/users/${user.id}`;
      
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.ok) {
          // User profile deleted successfully
          // Update the table or fetch the updated user list
          console.log(`Deleted user: ${user.email}`);
          window.location.reload(); // Refresh the page
        } else {
          // Handle error response
          throw new Error('Failed to delete user');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };
  
  let allUsers = `Loading...`;

  if (props.users.length > 0) {
    allUsers = props.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.username}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.score}</td>
          <td>
            <button onClick={() => handleAccountUpdate(user)}>Edit</button>
          </td>
          <td>
            <button onClick={() => handleDelete(user)}>Delete</button>
          </td>
        </tr>
      );
    });

  } else {
    
    allUsers = (
      <tr>
        <td colSpan="6">Loading...</td>
      </tr>
    );
  }

  return (
    <div id="Users">
      <h1>All Users</h1>
      <Link className="users-currentuser" to="/api/v1/current_user">Current User</Link>
      <br />
      <br />
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Latest Score</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{allUsers}</tbody>
      </table>
      <br />
    </div>
  );
}

export default Users;
