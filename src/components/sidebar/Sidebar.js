import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaUser } from "react-icons/fa";

import LogoutButton from "../../auth/LogoutButton";

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

const SidebarExample = () => {
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

        <MenuItem>
          <Icon>
            <FaUser />
            <Text isExpanded={isExpanded}>Conta</Text>
          </Icon>
        </MenuItem>

        <MenuItem>
          <LogoutButton>
            <Text isExpanded={isExpanded}></Text>
          </LogoutButton>
        </MenuItem>
      </Sidebar>
    </>
  );
};

export default SidebarExample;
