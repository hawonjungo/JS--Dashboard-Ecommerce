import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/signIn");
  };
  return <button onClick={logout}>Logout</button>;
};

export default UserProfile;
