import React from 'react';
import { Link } from 'react-router-dom';

export default function UserAccountDelete() {
    return (
        <div>
        <h1>Delete User Account</h1>
        <p>This is the Delete User Account page.</p>
        <Link to="/api/v1/users/">Back to Users</Link>
        </div>
    )
}