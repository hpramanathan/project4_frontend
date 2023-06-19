import React from 'react';
import { Link } from 'react-router-dom';

export default function ShowUser() {
    return (
        <div>
        <h1>Show User</h1>
        <p>This is the Show User page.</p>
        <Link to="/api/v1/users/:id">Back to Users</Link>
        </div>
    )
}