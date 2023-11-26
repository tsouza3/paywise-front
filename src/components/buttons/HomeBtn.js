import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { ReactComponent as RocketIcon } from "../../assets/rocket.svg";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  font-family: inherit;
  font-weight: 500;
  font-size: 17px;
  padding: 0.8em 1.3em 0.8em 0.9em;
  color: white;
  background: #ad5389;
  background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
  border: none;
  letter-spacing: 0.05em;
  border-radius: 16px;
  cursor: pointer;
  margin-top: 2em;
  width: 180px;

  svg {
    margin-right: 10px;
    transform: rotate(30deg);
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  span {
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  &:hover svg {
    transform: translateX(5px) rotate(90deg);
  }

  &:hover span {
    transform: translateX(7px);
  }
`;

const HomeBtn = ({ text }) => {
  return (
    <Link style={{ textDecoration: "none" }} to="/register">
      <StyledButton>
        <RocketIcon width="24" height="24" />
        <span>{text}</span>
      </StyledButton>
    </Link>
  );
};

export default HomeBtn;
