import React from "react";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

const LogoutButton = ({ text }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <TbLogout2 size="20" onClick={handleLogout}>
      {text}
    </TbLogout2>
  );
};

export default LogoutButton;
