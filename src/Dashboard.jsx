import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="dashboard-actions">
        <button onClick={() => navigate("/contact")}>Contact Us</button>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
