import React, { useState } from 'react';
import './UserLogOut.css';

const Logout = ({ setCurrUser }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const logout = async (setCurrUser) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/logout", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
      });
      const data = await response.json();
      if (!response.ok) throw data.error;

      localStorage.removeItem("token");
      setCurrUser(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLogout = () => {
    logout(setCurrUser);
    setShowConfirmation(false);
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <input
        type="button"
        value="Logout"
        onClick={handleClick}
        className="logout-button"
      />
      {showConfirmation && (
        <div className="logout-confirmation">
          <p>Are you sure you want to log out?</p>
          <button onClick={handleConfirmLogout}>Yes</button>
          <button onClick={handleCancelLogout}>No</button>
        </div>
      )}
    </div>
  );
};

export default Logout;
