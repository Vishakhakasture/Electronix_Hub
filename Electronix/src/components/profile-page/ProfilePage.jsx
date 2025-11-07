import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./ProfilePage.css";

const ProfilePage = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <h2>Your Profile</h2>
      {user ? (
        <>
          <p><strong>Email:</strong> {user.email}</p>

          <div className="profile-section">
            <h3>Your Orders</h3>
            <p>Fetching orders from Firebase (coming soon)...</p>
          </div>

          <div className="profile-section">
            <h3>Your Cart</h3>
            <p>Fetching cart data from Firebase (coming soon)...</p>
          </div>

          <div className="profile-section">
            <h3>Help Center</h3>
            <p>Need help? Contact support@electronix.com</p>
          </div>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;
