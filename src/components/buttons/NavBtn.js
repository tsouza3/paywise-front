import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const StyledButton = styled(Link)`
  --primary-color: #645bff;
  --secondary-color: #fff;
  --hover-color: #3d4e81;
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  color: var(--secondary-color);
  padding: 1em 1.8em;
  background: var(--primary-color);
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  font-weight: bold;
  font-family: "Poppins", sans-serif;

  text-decoration: none;

  &:hover {
    background-color: var(--hover-color);
  }

  .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;

    &::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      border: solid var(--secondary-color);
      border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
      display: inline-block;
      top: -3px;
      right: 3px;
      transition: 0.2s;
      padding: 3px;
      transform: rotate(-45deg);
    }
  }

  &:hover .arrow {
    background: var(--secondary-color);

    &::before {
      right: 0;
    }
  }
`;

const NavBtn = ({ text, to }) => {
  return (
    <StyledButton to={to} text={text}>
      {text}
      <div className="arrow-wrapper">
        <div className="arrow"></div>
      </div>
    </StyledButton>
  );
};

export default NavBtn;
