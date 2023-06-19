import './NavBar.css'
import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
    // State to track whether user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle login/logout
    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

      

return (
<div>
    <ul className="navbar-nav">
        <li className="nav-item"><Link className="nav-link" to="/">Home </Link></li>
        <li className="nav-item"><Link className="nav-link" to="/api/v1/signup">Sign Up </Link></li>
        <li className="nav-item">
          {isLoggedIn ? (
            <li className="nav-link" onClick={handleLogin}>
             <Link className="nav-link" to="/api/v1/users/:id">Account </Link> 
            </li>
          ) : (
            <Link className="nav-link" to="/api/v1/login">Log In </Link>
          )}
        </li>
        <li className="nav-item"><Link className="nav-link" to="/api/v1/users">Users </Link></li>
        <li className="nav-item"><Link className="nav-link" to="/api/v1/posts">Posts</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/quiz">Quiz</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/api/v1/logout">Log Out</Link></li>
    </ul>
</div>
    )
}

export default NavBar;  