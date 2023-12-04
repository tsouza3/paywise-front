import React from "react";
import styled from "styled-components";

import { ReactComponent as AddIcon } from "../../assets/add.svg";

const CartButton = styled.button`
  width: 140px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: rgb(255, 208, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-duration: 0.5s;
  overflow: hidden;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.103);
  position: relative;

  font-family: Poppins, "sans-serif";
  color: #fff;

  background-color: #5753c9;

  &:hover .IconContainer {
    transform: translateX(58px);
    border-radius: 40px;
    transition-duration: 0.5s;
  }

  &:hover .text {
    transform: translate(10px, 0px);
    transition-duration: 0.5s;
  }

  &:active {
    transform: scale(0.95);
    transition-duration: 0.5s;
  }
`;

const IconContainer = styled.span`
  position: absolute;
  left: -50px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;
  transition-duration: 0.5s;
`;

const Text = styled.p`
  height: 100%;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(17, 17, 17);
  z-index: 1;
  transition-duration: 0.5s;
  font-size: 1.04em;
  font-weight: 600;

  color: #fff;
`;

const SVGIcon = styled(AddIcon)`
  border-radius: 1px;
`;

const SubmitButton = ({ text }) => {
  return (
    <CartButton className="CartBtn">
      <IconContainer className="IconContainer">
        <SVGIcon />
      </IconContainer>
      <Text className="text">{text}</Text>
    </CartButton>
  );
};

export default SubmitButton;
