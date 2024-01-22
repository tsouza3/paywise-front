import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaUser } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { FaFilterCircleDollar } from "react-icons/fa6";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Sidebar = styled.div`
  height: 100vh;
  width: ${({ isExpanded }) => (isExpanded ? "200px" : "60px")};
  background-color: #3d4e70;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  font-family:
    Fira Mono,
    "sans-serif";
  font-weight: 500;
  
`;

const MenuItem = styled.div`
  padding: 15px;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
  }
`;

const Text = styled.span`
  margin-left: ${({ isExpanded }) => (isExpanded ? "15px" : "0")};
  opacity: ${({ isExpanded }) => (isExpanded ? "1" : "0")};
  transition:
    opacity 0.3s ease,
    margin-left 0.3s ease;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
`;

const Linkk = styled(Link)`
  text-decoration: none;
`;

const Sidebarr = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Sidebar isExpanded={isExpanded}>
        <MenuItem onClick={toggleSidebar}>
          <Icon>
            <FaBars />
          </Icon>
        </MenuItem>

        <Linkk to="/home">
          <MenuItem>
            <Icon>
              <FaUser />
              <Text isExpanded={isExpanded}>Conta</Text>
            </Icon>
          </MenuItem>
        </Linkk>

        <Linkk to="/gastos">
          <MenuItem>
            <Icon>
              <FaFilterCircleDollar />

              <Text isExpanded={isExpanded}>Filtrar</Text>
            </Icon>
          </MenuItem>
        </Linkk>

        <MenuItem onClick={handleLogout}>
          <Icon>
            <MdExitToApp />
            <Text isExpanded={isExpanded}>Logout</Text>
          </Icon>
        </MenuItem>
      </Sidebar>
    </>
  );
};

export default Sidebarr;
