import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import NavBtn from "../buttons/NavBtn";

const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: "Poppins", sans-serif;

  background-color: #3d4e81;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 5em;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  margin-right: 3em;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo to="/">Paywise</Logo>
      <NavLinks>
        <NavBtn to="/register" text="Criar conta" />
        <NavBtn to="/login" text="Entrar" />
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
